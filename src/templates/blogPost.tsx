import { Avatar, CardHeader, createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import { FlatButton } from '../components/button';
import { DisplayCard } from '../components/displayCard';
import { MDXImg } from '../components/images';
import { DrawerTOC, TableOfContents } from '../components/Layout/drawerTOC';
import { GlobalLayout } from '../components/Layout/global';
import { Link } from '../components/link';
import { TagChip } from '../components/tagChip';
import { BlogPostQuery } from '../gatsby-queries';
import { safe } from '../utils';

const styles = (theme: Theme) =>
  createStyles({
    postBody: {
      marginTop: theme.spacing.unit * 6
    },
    editButtonText: {
      margin: `0px ${theme.spacing.unit * 2}px`
    },
    button: {
      margin: `${theme.spacing.unit * 3}px 0px`,
      textAlign: 'center'
    },
    avatar: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(0,0,0,.03)'
    }
  });

interface Props extends WithStyles<typeof styles> {
  data: BlogPostQuery;
}

const BlogPost = ({ classes, data }: Props) => {
  const { mdx, authorAvatar, site } = safe(data);

  const { siteMetadata } = safe(site);
  const { author } = safe(siteMetadata);

  const { childImageSharp } = safe(authorAvatar);
  const { fluid } = safe(childImageSharp);
  const { src } = safe(fluid);

  const { frontmatter, code, timeToRead, tableOfContents, excerpt, fields } = safe(mdx);
  const { body } = safe(code);
  const { title, createdAt, updatedAt, categories } = safe(frontmatter);
  const { githubLink } = safe(fields);
  const { items } = safe(tableOfContents);

  return (
    <GlobalLayout drawer={<DrawerTOC items={items || ([] as TableOfContents[])} level={1} />}>
      <Helmet
        title={title || undefined}
        meta={[
          { name: 'description', content: excerpt || undefined },
          { name: 'keywords', content: categories ? categories.join(',') : undefined },
          { name: 'author', content: author || undefined }
        ]}
      />
      <DisplayCard variant="post">
        <CardHeader
          title="Jeff Willette"
          subheader={`
            ${moment(createdAt || undefined).format('ll')} ●
              updated: ${moment(updatedAt || undefined).format('ll')} ●
              ${timeToRead} minute read
            `}
          avatar={<Avatar src={src || undefined} className={classes.avatar} />}
        />
        {categories && categories.map((c, i) => c && <TagChip key={i} tag={c} />)}
        <Typography variant="h1">{title}</Typography>
        <div className={classes.postBody}>
          <MDXRenderer scope={{ MDXImg }}>{body}</MDXRenderer>
        </div>
        <div className={classes.button}>
          <Link to={githubLink || ''}>
            <FlatButton size="small">
              <Edit />
              <span className={classes.editButtonText}>Edit this page on Github</span>
            </FlatButton>
          </Link>
        </div>
      </DisplayCard>
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
    authorAvatar: file(name: { eq: "jeff" }, extension: { eq: "png" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        createdAt
        updatedAt
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
