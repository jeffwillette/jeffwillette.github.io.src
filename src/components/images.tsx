import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import Img from 'gatsby-image';
import React from 'react';
import { StateConsumer } from '../context';
import { BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid } from '../gatsby-queries';

const styles = (theme: Theme) =>
  createStyles({
    leftImg: {
      padding: `0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0px`,
      float: 'left'
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

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  align: 'left' | 'right';
  width?: string;
  fluid: BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid;
}

const mdxImg = ({ classes, width, fluid, align }: Props) => (
  <StateConsumer>
    {({ mobile }) => (
      <span
        className={c({
          [classes.leftImg]: !mobile && align === 'left',
          [classes.rightImg]: !mobile && align === 'right',
          [classes.mobile]: mobile
        })}
        style={{ width: width || '40%' }}
      >
        <Img fluid={fluid} />
      </span>
    )}
  </StateConsumer>
);

export const MDXImg = withStyles(styles)(mdxImg);
