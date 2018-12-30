import { graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import { GlobalLayout } from '../components/Layout/global';
import { PostExcerpt } from '../components/postExcerpt';
import {
  BlogQuery,
  BlogQuery_allMdx,
  BlogQuery_allMdx_edges,
  BlogQuery_allMdx_edges_node,
  BlogQuery_allMdx_edges_node_fields,
  BlogQuery_allMdx_edges_node_frontmatter,
  BlogQuery_site,
  BlogQuery_site_siteMetadata
} from '../gatsby-queries';

interface Props {
  data: BlogQuery;
}

const Blog = ({ data }: Props) => {
  const { site, allMdx } = data;
  const { siteMetadata } = site || ({} as BlogQuery_site);
  const { title: pageTitle, description, author, keywords } = siteMetadata || ({} as BlogQuery_site_siteMetadata);

  const { edges } = allMdx || ({} as BlogQuery_allMdx);

  return (
    <GlobalLayout>
      <Helmet
        title={pageTitle || undefined}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { name: 'author', content: author }
        ]}
      />
      {edges &&
        edges.map((edge, i) => {
          const { node } = edge || ({} as BlogQuery_allMdx_edges);
          const { frontmatter, fields, timeToRead, excerpt } = node || ({} as BlogQuery_allMdx_edges_node);
          const { slug } = fields || ({} as BlogQuery_allMdx_edges_node_fields);
          const { title, edited, created, categories } = frontmatter || ({} as BlogQuery_allMdx_edges_node_frontmatter);

          return (
            <PostExcerpt
              key={i}
              title={title || ''}
              created={moment(created)}
              slug={slug || ''}
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
    allMdx(
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___edited, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            edited
            created
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
