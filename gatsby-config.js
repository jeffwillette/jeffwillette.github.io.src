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
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            //https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/#options
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `-100`,
              className: 'offsetAnchor'
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`
  ]
};
