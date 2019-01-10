import { Card, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    leftPad: {
      width: '100%',
      margin: theme.spacing.unit,
      borderLeft: `${theme.spacing.unit}px solid ${theme.palette.divider}`
    },
    post: {
      width: '75%',
      margin: 'auto'
    },
    interview: {},
    indented: {
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
      paddingRight: theme.spacing.unit * 8
    }
  });

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  className?: string;
  variant?: 'leftPad' | 'post' | 'interview';
  indented: boolean;
}

const displayCard = ({ classes, children, className, variant, indented }: Props) => (
  <Card
    elevation={0}
    classes={{
      root: c({
        [classes.leftPad]: variant === 'leftPad',
        [classes.post]: variant === 'post',
        [classes.interview]: variant === 'interview',
        [classes.indented]: indented
      })
    }}
    className={className}
    children={children}
  />
);

export const DisplayCard = withStyles(styles)(displayCard);
