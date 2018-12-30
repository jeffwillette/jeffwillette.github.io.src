module.exports = {
  siteMetadata: {
    title: `Jeff Willette (deltaskelta)`,
    description: `developer blog for Jeff Willette`,
    keywords: 'Jeff Willette,deltaskelta,deltaskelta.github.io',
    author: 'Jeff Willette',
    twitter: 'https://twitter.com/delta_skelta',
    github: 'https://github.com/deltaskelta',
    githubProjectName: 'deltaskelta.github.io.src', // this must be the same as the directory name on file
    githubBranchPrefix: '/tree/dev'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`
      }
    },
    { resolve: `gatsby-mdx`, options: {} },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`
  ]
};
