import moment from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BlogQuery } from '../gatsby-queries';
import { safe } from '../utils';
import { GlobalLayout } from './Layout/global';
import { Pages } from './pages';
import { PostExcerpt } from './postExcerpt';

export interface BlogPageProps {
  data: BlogQuery;
  pageContext?: {
    page: number;
    pageSlugs: [
      {
        path: string;
        page: number;
      }
    ];
  };
}

export const Blog = ({ data, pageContext }: BlogPageProps) => {
  const { site, allMdx } = safe(data);
  const { siteMetadata } = safe(site);
  const { title: pageTitle, description, author, keywords } = safe(siteMetadata);

  const { edges } = safe(allMdx);

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
      {pageContext!.pageSlugs && <Pages show={5} pageContext={safe(pageContext!)} />}
    </GlobalLayout>
  );
};
