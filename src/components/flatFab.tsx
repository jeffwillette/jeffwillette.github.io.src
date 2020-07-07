import { makeStyles, Theme } from '@material-ui/core';
import Fab, { FabProps } from '@material-ui/core/Fab';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    margin: theme.spacing(1),
  },
}));

export const FlatFab = ({ ...props }: FabProps) => {
  const classes = useStyles();
  return <Fab disableRipple classes={{ root: classes.root }} {...props} />;
};
