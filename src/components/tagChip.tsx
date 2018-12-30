import { Chip, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: `0px ${theme.spacing.unit}px`
    }
  });

interface Props extends WithStyles<typeof styles> {
  tag: string;
}

const tagChip = ({ classes, tag }: Props) => <Chip clickable variant="outlined" className={classes.chip} label={tag} />;

export const TagChip =  withStyles(styles)(tagChip);
