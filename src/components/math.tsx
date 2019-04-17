import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { BlockMath as BM, InlineMath as IM } from 'react-katex';

const useStyles = makeStyles((theme: Theme) => ({
  inlineMath: {
    margin: `0px ${theme.spacing(1)}px`
  },
  blockMath: {}
}));

interface Props {
  children: React.ReactNode;
}

// these spread the math prop into the katex component like the react-katex docs show
// TODO: check that these still work
export const InlineMath = ({ children }) => {
  const classes = useStyles();
  return (
    <span className={classes.inlineMath}>
      <IM children={children} />
    </span>
  );
};

export const BlockMath = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <span className={classes.blockMath}>
      <BM children={children} />
    </span>
  );
};
