import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

const useStyles = makeStyles((theme: Theme) => ({
  inlineMath: {
    margin: `0px ${theme.spacing(1)}px`
  },
  blockMath: {}
}));

interface Props {
  i?: string;
  b?: string;
}

// these spread the math prop into the katex component like the react-katex docs show
export const M = ({ i, b }: Props) => {
  const classes = useStyles();

  if (i) {
    return (
      <span className={classes.inlineMath}>
        <InlineMath children={i} />
      </span>
    );
  }

  if (b) {
    return (
      <span className={classes.blockMath}>
        <BlockMath children={b} />
      </span>
    );
  }

  throw new Error('i or b need to be passed as props');
};
