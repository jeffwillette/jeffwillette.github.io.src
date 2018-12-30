import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    buttonRoot: {
      boxShadow: 'none',
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
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
  });

type Props = WithStyles<typeof styles> & Exclude<ButtonProps, 'classes'>;

const button = ({ classes, ...props }: Props) => <Button classes={{ root: classes.buttonRoot }} {...props} />;

export const FlatButton = withStyles(styles)(button);
