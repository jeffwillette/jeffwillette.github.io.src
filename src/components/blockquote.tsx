import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { themeAddons } from '../theme';

const useStyles = makeStyles((theme: Theme) => ({
  quote: {
    borderLeft: themeAddons.greenOutline,
    backgroundColor: themeAddons.greenBg,
    padding: theme.spacing(1) / 2,
    margin: 'auto',
    borderRadius: 5
  },
  text: {
    color: 'rgba(0,0,0,.74)',
    fontWeight: 'bold'
  }
}));

export interface BlockQuoteProps {
  children: Array<string | JSX.Element>;
}

export const BlockQuote = ({ children }: BlockQuoteProps) => {
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
