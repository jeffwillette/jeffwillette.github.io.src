import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  quote: {
    borderLeft: `5px solid rgba(15, 89, 52, 0.6)`,
    backgroundColor: `rgb(119, 179, 149, 0.6)`,
    padding: theme.spacing(1) / 2,
    margin: 'auto',
    borderRadius: 5
  },
  text: {
    color: 'rgba(0,0,0,.74)'
  }
}));

interface Props {
  children: Array<string | JSX.Element>;
}

export const BlockQuote = ({ children }: Props) => {
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
