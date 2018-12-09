import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import c from 'classnames';

const styles = () =>
  createStyles({
    white: {
      color: 'white',
      textDecoration: 'none'
    }
  });

interface Props extends WithStyles<typeof styles> {
  href: string;
  children: string | JSX.Element;
  white?: boolean;
}

const A = ({ href, children, classes, white }: Props) => (
  <a className={c({ [classes.white]: white })} href={href}>
    {children}
  </a>
);

export default withStyles(styles)(A);
