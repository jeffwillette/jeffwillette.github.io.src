import { makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    marginTop: theme.spacing(3),
    borderRadius: 0,
    backgroundColor: `rgba(0,0,0,.65)`,
    height: theme.spacing(40),
    paddingTop: theme.spacing(3),
    borderTop: `5px solid rgba(255,255,255,.5)`,
  },
  date: {
    color: theme.palette.secondary.contrastText,
    textAlign: 'center',
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <Paper classes={{ root: classes.footer }}>
      <Typography variant="body1" className={classes.date} children={moment().format('ll')} />
    </Paper>
  );
};
