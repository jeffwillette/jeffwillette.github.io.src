import { Button, createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import DrawerTOC, { TableOfContents } from '../components/Layout/drawerTOC';
import GlobalLayout from '../components/Layout/global';
import Link from '../components/link';
import TagChip from '../components/tagChip';
import {
  BlogPostQuery,
  BlogPostQuery_mdx,
  BlogPostQuery_mdx_fields,
  BlogPostQuery_mdx_frontmatter,
  BlogPostQuery_site,
  BlogPostQuery_site_siteMetadata
} from '../gatsby-queries';

const styles = (theme: Theme) =>
  createStyles({
    postBody: {
      marginTop: theme.spacing.unit * 6
    },
    editButtonText: {
      margin: `0px ${theme.spacing.unit * 2}px`
    },
    button: {
      textAlign: 'center'
    }
  });

interface Props extends WithStyles<typeof styles> {
  data: BlogPostQuery;
}

const BlogPost = ({ classes, data }: Props) => {
  const { mdx, site } = data || ({} as BlogPostQuery);
  const { siteMetadata } = site || ({} as BlogPostQuery_site);
  const { author } = siteMetadata || ({} as BlogPostQuery_site_siteMetadata);
  const { frontmatter, code, timeToRead, tableOfContents, excerpt, fields } = mdx || ({} as BlogPostQuery_mdx);
  const { title, created, edited, categories } = frontmatter || ({} as BlogPostQuery_mdx_frontmatter);
  const { githubLink } = fields || ({} as BlogPostQuery_mdx_fields);
  const { items } = (tableOfContents as TableOfContents) || ({} as TableOfContents);

  return (
    <GlobalLayout drawer={<DrawerTOC items={items || ([] as TableOfContents[])} level={1} />}>
      <Helmet
        title={title || undefined}
        meta={[
          { name: 'description', content: excerpt },
          { name: 'keywords', content: categories },
          { name: 'author', content: author }
        ]}
      />
      <Typography variant="h1">{title}</Typography>
      {categories && categories.map((c, i) => c && <TagChip key={i} tag={c} />)}
      <TagChip tag={`${timeToRead} minute read`} />
      <TagChip tag={`created: ${moment(created).format('LLL')}`} />
      <TagChip tag={`edited: ${moment(edited).format('LLL')}`} />

      <div className={classes.postBody}>
        <MDXRenderer pageContext={{ something: 'context' }}>{code && code.body}</MDXRenderer>
      </div>
      <div className={classes.button}>
        <Link to={githubLink || ''}>
          <Button size="small" variant="contained">
            <Edit />
            <span className={classes.editButtonText}>Edit this page on Github</span>
          </Button>
        </Link>
      </div>
    </GlobalLayout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    site {
      siteMetadata {
        author
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        created
        edited
        categories
      }
      fields {
        githubLink
      }
      code {
        body
      }
      timeToRead
      tableOfContents
      excerpt
    }
  }
`;

export default withStyles(styles)(BlogPost);
