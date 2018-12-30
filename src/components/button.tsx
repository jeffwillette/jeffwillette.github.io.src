import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    buttonRoot: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      border: '1px solid',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc'
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf'
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
      }
    }
  });

type Props = WithStyles<typeof styles> & Exclude<ButtonProps, 'classes'>;

const button = ({ classes, ...props }: Props) => <Button classes={{ root: classes.buttonRoot }} {...props} />;

export const FlatButton = withStyles(styles)(button);
