import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';
import { StateConsumer } from '../context';
import { BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid } from '../gatsby-queries';

const styles = (theme: Theme) =>
  createStyles({
    leftImg: {
      padding: `0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0px`,
      float: 'left'
    },
    centerImg: {
      display: 'block',
      margin: 'auto'
    },
    rightImg: {
      padding: `0px 0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
      float: 'right',
      textAlign: 'right'
    },
    mobile: {
      width: '100% !important'
    }
  });

interface BaseProps extends WithStyles<typeof styles> {
  align: 'left' | 'right' | 'center';
  width?: string;
}

interface MDXSharpImgProps extends BaseProps, GatsbyImageProps {}

const mdxSharpImg = ({ classes, width, fluid, align }: MDXSharpImgProps) => (
  <StateConsumer>
    {({ mobile }) => (
      <span
        className={c({
          [classes.leftImg]: !mobile && align === 'left',
          [classes.rightImg]: !mobile && align === 'right',
          [classes.centerImg]: !mobile && align === 'center',
          [classes.mobile]: mobile
        })}
        style={{ width: width || '40%' }}
      >
        <Img fluid={fluid} />
      </span>
    )}
  </StateConsumer>
);

export const MDXSharpImg = withStyles(styles)(mdxSharpImg);

interface MDXSrcImgProps extends BaseProps {
  src: string;
}

const mdxSrcImg = ({ src, classes, width, align }: MDXSrcImgProps) => (
  <StateConsumer>
    {({ mobile }) => (
      <img
        className={c({
          [classes.leftImg]: !mobile && align === 'left',
          [classes.rightImg]: !mobile && align === 'right',
          [classes.centerImg]: !mobile && align === 'center',
          [classes.mobile]: mobile
        })}
        style={{ width: width || '40%' }}
        src={src}
      />
    )}
  </StateConsumer>
);

export const MDXSrcImg = withStyles(styles)(mdxSrcImg);
