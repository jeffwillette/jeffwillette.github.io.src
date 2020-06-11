import { Button, makeStyles, Theme } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  buttonRoot: {
    boxShadow: 'none',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    backgroundColor: 'rgba(0,0,0,.20)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.15)'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }
  }
}));

export const FlatButton = ({ ...props }: ButtonProps) => {
  const classes = useStyles();
  return <Button classes={{ root: classes.buttonRoot }} {...props} />;
};
