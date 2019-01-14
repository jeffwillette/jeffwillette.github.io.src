import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import React from 'react';
import { StateConsumer } from '../context';

const styles = (theme: Theme) =>
  createStyles({
    leftImg: {
      padding: `0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0px`,
      float: 'left',
      width: '40%'
    },
    rightImg: {
      padding: `0px 0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
      float: 'right',
      width: '40%'
    },
    mobile: {
      width: '100%'
    }
  });

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  align: 'left' | 'right';
}

const mdxImg = ({ classes, children, align }: Props) => (
  <StateConsumer>
    {({ mobile }) => (
      <span
        className={c({
          [classes.leftImg]: !mobile && align === 'left',
          [classes.rightImg]: !mobile && align === 'right',
          [classes.mobile]: mobile
        })}
        children={<span>{children}</span>}
      />
    )}
  </StateConsumer>
);

export const MDXImg = withStyles(styles)(mdxImg);
