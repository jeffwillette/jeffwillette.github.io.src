module.exports = {
  siteMetadata: {
    title: `Jeff Willette (deltaskelta)`,
    description: `developer blog for Jeff Willette`,
    keywords: 'Jeff Willette,deltaskelta,deltaskelta.github.io',
    author: 'Jeff Willette',
    twitter: 'https://twitter.com/delta_skelta',
    github: 'https://github.com/deltaskelta'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-remark`
  ]
};
