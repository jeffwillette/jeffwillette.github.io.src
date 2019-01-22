import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql, navigate } from 'gatsby';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import { FlatFab } from '../components/flatFab';
import { GlobalLayout } from '../components/Layout/global';
import { PostExcerpt } from '../components/postExcerpt';
import { BlogQuery } from '../gatsby-queries';
import { safe } from '../utils';

const styles = (_: Theme) =>
  createStyles({
    pages: {
      textAlign: 'center'
    }
  });

interface Props extends WithStyles<typeof styles> {
  data: BlogQuery;
  pageContext: {
    page: number;
    pageSlugs: [
      {
        path: string;
        page: number;
      }
    ];
  };
}

const Blog = ({ data, classes, pageContext }: Props) => {
  const { site, allMdx } = safe(data);
  const { siteMetadata } = safe(site);
  const { title: pageTitle, description, author, keywords } = safe(siteMetadata);

  const { edges } = safe(allMdx);

  const { page, pageSlugs } = safe(pageContext);

  return (
    <GlobalLayout>
      <Helmet
        title={pageTitle || undefined}
        meta={[
          { name: 'description', content: description || undefined },
          { name: 'keywords', content: keywords || undefined },
          { name: 'author', content: author || undefined }
        ]}
      />
      {edges &&
        edges.map((edge, i) => {
          const { node } = safe(edge);
          const { frontmatter, fields, timeToRead, excerpt } = safe(node);
          const { slug } = safe(fields);
          const { title, updatedAt, createdAt, categories } = safe(frontmatter);

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
      <div className={classes.pages}>
        {pageSlugs.map(obj => {
          return (
            <FlatFab
              disabled={page === obj.page}
              onClick={() => navigate(obj.path)}
              size="small"
              key={obj.page}
              children={obj.page}
            />
          );
        })}
      </div>
    </GlobalLayout>
  );
};

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

export default withStyles(styles)(Blog);
