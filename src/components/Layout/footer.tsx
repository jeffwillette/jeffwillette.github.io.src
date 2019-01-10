import { createStyles, Paper, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      marginTop: theme.spacing.unit * 3,
      borderRadius: 0,
      backgroundColor: `rgba(0,0,0,.65)`,
      height: theme.spacing.unit * 40,
      paddingTop: theme.spacing.unit * 3,
      borderTop: `5px solid rgba(255,255,255,.5)`
    },
    date: {
      color: theme.palette.secondary.contrastText,
      textAlign: 'center'
    }
  });

interface Props extends WithStyles<typeof styles> {}

const footer = ({ classes }: Props) => (
  <Paper classes={{ root: classes.footer }}>
    <Typography variant="body1" className={classes.date} children={moment().format('ll')} />
  </Paper>
);

export const Footer = withStyles(styles)(footer);
