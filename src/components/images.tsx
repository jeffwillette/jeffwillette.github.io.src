import { makeStyles, Theme } from '@material-ui/core';
import c from 'classnames';
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import React from 'react';
import { StateConsumer } from '../context';
import { BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid as FluidQuery } from '../gatsby-queries';

const useStyles = makeStyles((theme: Theme) => ({
  leftImg: {
    padding: `0px ${theme.spacing(2)}px ${theme.spacing(2)}px 0px`,
    float: 'left'
  },
  centerImg: {
    display: 'block',
    margin: 'auto'
  },
  rightImg: {
    padding: `0px 0px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    float: 'right',
    textAlign: 'right'
  },
  mobile: {
    width: '100% !important'
  }
}));

interface BaseProps {
  align: 'left' | 'right' | 'center';
  width?: string;
}

interface MDXSharpImgProps extends BaseProps, GatsbyImageProps {}

export const safeFluid = (f: FluidQuery | FluidObject | null): FluidObject => {
  return {
    aspectRatio: f ? f.aspectRatio || 1 : 1,
    sizes: f ? f.sizes || '' : '',
    src: f ? f.src || '' : '',
    srcSet: f ? f.srcSet || '' : '',
    tracedSVG: f ? f.tracedSVG || '' : ''
  };
};

export const MDXSharpImg = ({ width, fluid, align }: MDXSharpImgProps) => {
  const classes = useStyles();
  return (
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
};

interface MDXSrcImgProps extends BaseProps {
  src: string;
}

export const MDXSrcImg = ({ src, width, align }: MDXSrcImgProps) => {
  const classes = useStyles();
  return (
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
};
