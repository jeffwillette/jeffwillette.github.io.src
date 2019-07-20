import { Avatar, CardHeader, makeStyles, Theme, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import 'katex/dist/katex.min.css';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';
import { FlatButton } from '../components/button';
import { DisplayCard } from '../components/displayCard';
import { MDXSharpImg, MDXSrcImg, safeFluid } from '../components/images';
import { DrawerTOC, TableOfContents } from '../components/Layout/drawerTOC';
import { GlobalLayout } from '../components/Layout/global';
import { Link } from '../components/link';
import { TagChip } from '../components/tagChip';
import { BlogPostQuery } from '../gatsby-queries';
import { safe } from '../utils';

const useStyles = makeStyles((theme: Theme) => ({
  postBody: {
    marginTop: theme.spacing(3)
  },
  editButtonText: {
    margin: `0px ${theme.spacing(2)}px`
  },
  button: {
    margin: `${theme.spacing(3)}px 0px`,
    textAlign: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,.03)'
  },
  avatarCard: {
    marginTop: theme.spacing(2),
    paddingBottom: 0
  }
}));

interface Props {
  data: BlogPostQuery;
}

export default ({ data }: Props) => {
  const classes = useStyles();
  const { mdx, authorAvatar, site } = safe(data);

  const { siteMetadata } = safe(site);
  const { author } = safe(siteMetadata);

  const { childImageSharp } = safe(authorAvatar);
  const { fluid } = safe(childImageSharp);
  const { src } = safe(fluid);

  const { frontmatter, body, timeToRead, tableOfContents, excerpt, fields } = safe(mdx);
  const { title, createdAt, updatedAt, categories, images } = safe(frontmatter);
  const { githubLink } = safe(fields);
  const { items } = safe(tableOfContents);

  const imgs: { [k: string]: React.ReactNode } = {};
  if (images) {
    images.forEach((image, i) => {
      const { childImageSharp: c, publicURL } = safe(image);
      const { fluid: f } = safe(c);
      imgs[`Img${i + 1}`] = ({ align, width }) =>
        f ? (
          <MDXSharpImg align={align} width={width} fluid={safeFluid(f)} />
        ) : (
          <MDXSrcImg align={align} width={width} src={publicURL || ''} />
        );
    });
  }

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
          title={author}
          classes={{ root: classes.avatarCard }}
          subheader={`
            ${moment(createdAt || undefined).format('ll')} ●
              edited: ${moment(updatedAt || undefined).format('ll')} ●
              ${timeToRead} minute read
            `}
          avatar={<Avatar src={src || undefined} className={classes.avatar} />}
        />
        <Typography variant="h1">{title}</Typography>
        {categories && categories.map((c, i) => c && <TagChip key={i} tag={c} />)}
        <div className={classes.postBody}>
          <MDXRenderer imgs={imgs}>{body}</MDXRenderer>
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
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        createdAt
        updatedAt
        categories
        images {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      fields {
        githubLink
      }
      body
      timeToRead
      tableOfContents
      excerpt
    }
  }
`;
