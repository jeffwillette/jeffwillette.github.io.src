import TeX from '@matejmazur/react-katex';
import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

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
        <TeX math={i} />
      </span>
    );
  }

  if (b) {
    return (
      <span className={classes.blockMath}>
        <TeX math={b} block />
      </span>
    );
  }

  throw new Error('i or b need to be passed as props');
};
