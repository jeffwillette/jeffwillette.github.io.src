import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';

const styles = () =>
  createStyles({
    quote: {
      borderLeft: `5px solid rgba(0,0,0,.2)`
    },
    text: {
      color: 'rgba(0,0,0,.54)'
    }
  });

interface Props extends WithStyles<typeof styles> {
  children: Array<string | JSX.Element>;
}

const Blockquote = ({ classes, children }: Props) => (
  <div className={classes.quote}>
    <blockquote>
      <Typography variant="body1" className={classes.text}>
        {children}
      </Typography>
    </blockquote>
  </div>
);

export default withStyles(styles)(Blockquote);
