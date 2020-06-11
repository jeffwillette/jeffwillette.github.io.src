import { graphql } from 'gatsby';
import { Blog } from '../components/blogPage';

export const query = graphql`
  query Unpublished {
    site {
      siteMetadata {
        title
        description
        keywords
        author
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { published: { eq: false } } }
      sort: { fields: [frontmatter___updatedAt], order: DESC }
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
