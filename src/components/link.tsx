import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import c from 'classnames';
import { Link } from 'gatsby';

const styles = () =>
  createStyles({
    white: {
      color: 'white !important',
      '&:hover': {
        color: 'rgba(255,255,255,.9) !important'
      }
    },
    link: {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.5)',
      fontWeight: 'bold',
      '&:hover': {
        color: 'rgba(0,0,0,.65)'
      }
    }
  });

interface AProps extends WithStyles<typeof styles> {
  to: string;
  children: string | JSX.Element;
  className?: string;
  white?: boolean;
}

const AComponent = ({ to, children, classes, white }: AProps) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);
  const className = c(classes.link, { [classes.white]: white });

  return internal ? (
    <Link to={to} children={children} className={className} />
  ) : (
    <a className={className} href={to} children={children} />
  );
};

export default withStyles(styles)(AComponent);
