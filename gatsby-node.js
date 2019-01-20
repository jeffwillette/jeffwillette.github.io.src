const { createFilePath } = require('gatsby-source-filesystem');
const GithubSlugger = require('github-slugger');

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
    '/blog/': path.resolve('./src/templates/blogPost.tsx'),
    '/tags/': path.resolve('./src/templates/tags.tsx')
  };

  const blogIndexPage = path.resolve('./src/pages/blog.tsx');

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
                  categories
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

        const slugger = new GithubSlugger();

        // sort the files into published and unpublished
        let published = [];
        let unpublished = [];
        result.data.allMdx.edges.forEach(edge => {
          if (edge.node.frontmatter.published) {
            published.push(edge.node);
            return;
          }

          unpublished.push(edge.node);
        });

        // make a unique set of tags and then make a tag page for each
        let tags = {};
        published.forEach(node => {
          const { frontmatter } = node;
          const { categories } = frontmatter;

          categories.forEach(c => {
            let s = slugger.slug(c);
            slugger.reset();

            // set the key (slug) to the raw tag which will be used to pass to the page graphql context, so they can
            // be queried from the tag page graphql
            if (!tags[s]) {
              tags[s] = c;
            }
          });
        });

        Object.keys(tags).forEach(tag => {
          createPage({
            path: `/tags/${tag}`,
            component: pathAndTemplates['/tags/'],
            context: { tagRegex: `/^${tags[tag]}$/i`, tagName: tag }
          });
        });

        // make paginated blog pages based on the total number of mdx files returned
        const postsPerPage = 10;
        const numPages = Math.ceil(published.length / postsPerPage);

        const pagesPaths = [];
        Array.from({ length: numPages }).forEach((_, i) => {
          pagesPaths.push({ path: i === 0 ? `/blog` : `/blog/${i + 1}`, page: i + 1 });
        });

        pagesPaths.forEach(obj => {
          createPage({
            path: obj.path,
            component: blogIndexPage,
            context: {
              page: obj.page,
              pageSlugs: pagesPaths,
              limit: postsPerPage,
              skip: (obj.page - 1) * postsPerPage // -1 because page 2 skips 1 * postsPerPage posts
            }
          });
        });

        // make a page for each mdx file
        published.forEach(node => createMdxPage(node, pathAndTemplates, createPage));
        if (process.env.NODE_ENV === 'development') {
          unpublished.forEach(node => createMdxPage(node, pathAndTemplates, createPage));
        }
      })
    );
  });
};

// createMdx page creates a page for the mdx file and uses the template based off of the slug
const createMdxPage = (node, pathAndTemplates, createPage) => {
  const { id, fields, code, frontmatter } = node;
  const { slug } = fields;

  Object.keys(pathAndTemplates).forEach(p => {
    if (slug.includes(p)) {
      createPage({
        path: slug,
        component: pathAndTemplates[p],
        context: { id }
      });
    }
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  // The blog page needs to be created with the page context for pagination.
  // This will be taken care of in createPages when I have all the pages in
  // a graphql query
  if (page.path === '/blog/') {
    deletePage(page);
  }
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({ plugins: [new BundleAnalyzerPlugin()] });
  }
};
