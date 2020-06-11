import { graphql } from 'gatsby';
import { Blog } from '../components/blogPage';

export const query = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        keywords
        author
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___updatedAt], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            createdAt
            updatedAt
            categories
          }
          fields {
            slug
          }
          timeToRead
          excerpt
        }
      }
    }
  }
`;

export default Blog;
