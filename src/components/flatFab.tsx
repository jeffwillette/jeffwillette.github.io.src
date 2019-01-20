import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Fab, { FabProps } from '@material-ui/core/Fab';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      margin: theme.spacing.unit
    }
  });

type Props = WithStyles<typeof styles> & Exclude<FabProps, 'classes'>;

const flatFab = ({ classes, ...props }: Props) => <Fab disableRipple classes={{ root: classes.root }} {...props} />;

export const FlatFab = withStyles(styles)(flatFab);
