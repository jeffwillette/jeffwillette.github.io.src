import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  quote: {
    borderLeft: `5px solid rgba(0,0,0,.2)`
  },
  text: {
    color: 'rgba(0,0,0,.54)'
  }
});

interface Props {
  children: Array<string | JSX.Element>;
}

export const Blockquote = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.quote}>
      <blockquote>
        <Typography variant="body1" className={classes.text}>
          {children}
        </Typography>
      </blockquote>
    </div>
  );
};
