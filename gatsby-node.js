const { createFilePath } = require('gatsby-source-filesystem');

const path = require('path');

const config = require('./gatsby-config');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// when the node is created (the first time the file is discovered) this is run
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    // filenames have locales so => /page/path/file.[locale]/
    const slug = createFilePath({
      node,
      getNode,
      basePath: './'
    });

    // create a slug for all markdown pages
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    const { github, githubProjectName, githubBranchPrefix } = config.siteMetadata;
    let localPath = node.fileAbsolutePath.split(githubProjectName);
    let githubPath = path.join(githubProjectName, githubBranchPrefix, localPath[localPath.length - 1]);

    createNodeField({
      node,
      name: 'githubLink',
      value: `${github}/${githubPath}`
    });
  }
};

// this is for creating pages from the markdown files at the slug location, this is run
// when it is time to take the nodes created and generate pages from them.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const pathAndTemplates = {
    '/blog/': path.resolve('./src/templates/blogPost.tsx')
  };

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMdx {
            edges {
              node {
                id
                frontmatter {
                  published
                }
                fields {
                  slug
                }
                code {
                  scope
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log('ERRORS:');
          console.log(result);
          reject(result.errors);
        }

        result.data.allMdx.edges.forEach(({ node }) => {
          const { id, fields, code, frontmatter } = node;
          const { slug } = fields;
          const { published } = frontmatter;

          const skip = process.env.NODE_ENV === 'production' && !published;
          Object.keys(pathAndTemplates).forEach(p => {
            if (slug.includes(p) && !skip) {
              createPage({
                path: slug,
                component: pathAndTemplates[p],
                context: { id }
              });
            }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({ plugins: [new BundleAnalyzerPlugin()] });
  }
};
