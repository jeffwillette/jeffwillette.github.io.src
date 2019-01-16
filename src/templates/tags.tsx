import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import { GlobalLayout } from '../components/Layout/global';
import { PostExcerpt } from '../components/postExcerpt';
import { TagPage } from '../gatsby-queries';
import { safe } from '../utils';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  data: TagPage;
  pageContext: { tagRegex: string; tagName: string };
}

const Tags = ({ data, pageContext }: Props) => {
  const { tagName } = safe(pageContext);

  const { allMdx, site } = safe(data);
  const { edges } = safe(allMdx);
  const { siteMetadata } = safe(site);
  const { author } = safe(siteMetadata);

  return (
    <GlobalLayout>
      <Helmet
        title={`${tagName} posts`}
        meta={[
          { name: 'description', content: `posts tagged with ${tagName}` },
          { name: 'keywords', content: `${tagName}` },
          { name: 'author', content: author }
        ]}
      />
      {edges &&
        edges.map((edge, i) => {
          const { node } = safe(edge);
          const { frontmatter, fields, timeToRead, excerpt } = safe(node);
          const { title, createdAt, updatedAt, categories } = safe(frontmatter);
          const { slug } = safe(fields);

          return (
            <PostExcerpt
              key={i}
              title={title || ''}
              createdAt={moment(createdAt || '')}
              updatedAt={moment(updatedAt || '')}
              slug={slug || ''}
              categories={categories || []}
              timeToRead={timeToRead || 0}
              excerpt={excerpt || ''}
            />
          );
        })}
    </GlobalLayout>
  );
};

// tagRegex is a case insensitive regex /tagname/i
export const pageQuery = graphql`
  query TagPage($tagRegex: String) {
    site {
      siteMetadata {
        title
        description
        keywords
        author
      }
    }
    allMdx(
      sort: { fields: frontmatter___updatedAt, order: DESC }
      filter: { frontmatter: { categories: { regex: $tagRegex } } }
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
export default withStyles(styles)(Tags);
