import * as React from 'react';
import Header from './Header';

import withRoot from '../../withRoot';
import { compose } from 'recompose';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import Drawer from './drawer';
import { drawerWidth } from './drawer';
import './index.css';

const styles = (theme: Theme) =>
  createStyles({
    outerContent: {
      margin: `0px 0px 0px ${drawerWidth}px`,
      maxWidth: 960,
      padding: '0px 1.0875rem 1.45rem',
      paddingTop: theme.spacing.unit * 2,
      marginTop: 65
    },
    innerContent: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    }
  });

interface Props extends React.HTMLProps<HTMLDivElement>, WithStyles<typeof styles> {
  children: JSX.Element[];
  drawer: JSX.Element | JSX.Element[];
}

const GlobalLayout = ({ children, classes, drawer }: Props) => (
  <div>
    <Header />
    <Drawer>{drawer}</Drawer>
    <div className={classes.outerContent}>
      <div className={classes.innerContent}>{children}</div>
    </div>
  </div>
);

export default compose<Props, any>(
  withRoot,
  withStyles(styles)
)(GlobalLayout);
