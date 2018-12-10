import React from 'react';
import GlobalLayout from '../components/Layout/global';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PostExcerpt from '../components/postExcerpt';
import {
  BlogQuery,
  BlogQuery_site,
  BlogQuery_site_siteMetadata,
  BlogQuery_allMdx,
  BlogQuery_allMdx_edges,
  BlogQuery_allMdx_edges_node,
  BlogQuery_allMdx_edges_node_frontmatter
} from '../gatsby-queries';
import moment from 'moment';

interface Props {
  data: BlogQuery;
}

const Blog = ({ data }: Props) => {
  const { site, allMdx } = data;
  const { siteMetadata } = site || ({} as BlogQuery_site);
  const { title, description, author, keywords } = siteMetadata || ({} as BlogQuery_site_siteMetadata);

  const { edges } = allMdx || ({} as BlogQuery_allMdx);

  return (
    <GlobalLayout>
      <Helmet
        title={title || undefined}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { name: 'author', content: author }
        ]}
      />
      {edges &&
        edges.map(edge => {
          const { node } = edge || ({} as BlogQuery_allMdx_edges);
          const { frontmatter, timeToRead, excerpt } = node || ({} as BlogQuery_allMdx_edges_node);
          const { title, edited, created, categories } = frontmatter || ({} as BlogQuery_allMdx_edges_node_frontmatter);

          return (
            <PostExcerpt
              title={title || ''}
              created={moment(created)}
              edited={moment(edited)}
              categories={categories || []}
              timeToRead={timeToRead || 0}
              excerpt={excerpt || ''}
            />
          );
        })}
    </GlobalLayout>
  );
};

export const query = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
        description
        keywords
        author
      }
    }
    allMdx(filter: { fileAbsolutePath: { regex: "/blog/" } }, sort: { fields: frontmatter___edited, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            edited
            created
            categories
          }
          timeToRead
          excerpt
        }
      }
    }
  }
`;

export default Blog;
