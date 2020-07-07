import { Card, makeStyles, Theme } from '@material-ui/core';
import c from 'classnames';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  leftPad: {
    width: '100%',
    margin: theme.spacing(1),
    borderLeft: `${theme.spacing(1)}px solid ${theme.palette.divider}`,
  },
  post: {
    margin: 'auto',
  },
  interview: {},
  indented: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    paddingRight: theme.spacing(8),
  },
}));

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'leftPad' | 'post' | 'interview';
  indented?: boolean;
}

export const DisplayCard = ({ children, className, variant, indented }: Props) => {
  const classes = useStyles();
  return (
    <Card
      elevation={0}
      classes={{
        root: c({
          [classes.leftPad]: variant === 'leftPad',
          [classes.post]: variant === 'post',
          [classes.interview]: variant === 'interview',
          [classes.indented]: indented,
        }),
      }}
      className={className}
      children={children}
    />
  );
};
