import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { BlockMath as BM, InlineMath as IM } from 'react-katex';

const styles = (theme: Theme) =>
  createStyles({
    inlineMath: {
      margin: `0px ${theme.spacing.unit}px`
    },
    blockMath: {}
  });

interface Props extends WithStyles<typeof styles> {}

// these spread the math prop into the katex component like the react-katex docs show
export const InlineMath = withStyles(styles)(({ classes, ...props }: Props) => (
  <span className={classes.inlineMath}>
    <IM {...props} />
  </span>
));

export const BlockMath = withStyles(styles)(({ classes, ...props }: Props) => (
  <span className={classes.blockMath}>
    <BM {...props} />
  </span>
));
