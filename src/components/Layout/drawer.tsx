import {
  createStyles,
  Drawer as MDDrawer,
  Hidden,
  SwipeableDrawer,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';

import c from 'classnames';
import React from 'react';
import { StateConsumer } from '../../context';

export const drawerWidth = 280;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawer: {
      width: drawerWidth,
      zIndex: theme.zIndex.drawer,
      marginTop: 65,
      overflowY: 'scroll',
      height: 'calc(100% - 64px)',
      borderRight: '0px solid'
    },
    drawerContentTopPadding: {
      // the drawer comes under the bar on desktop so it needs some top padding
      paddingTop: 85
    },
    outerDiv: {
      marginTop: 65,
      display: 'flex'
    },
    drawerContainer: {
      height: '101%'
    }
  });

interface Props extends WithStyles<typeof styles> {
  children: JSX.Element | JSX.Element[] | Array<JSX.Element | JSX.Element[] | null>;
}

class drawer extends React.Component<Props, {}> {
  public render() {
    const { classes, children } = this.props;
    return (
      <StateConsumer>
        {({ drawerOpen, toggleDrawer }) => {
          return (
            <div className={classes.outerDiv}>
              <Hidden mdUp>
                {/* show only on mobile screens */}
                <SwipeableDrawer
                  open={drawerOpen}
                  onOpen={toggleDrawer}
                  onClose={toggleDrawer}
                  variant="temporary"
                  anchor="left"
                  ModalProps={{ keepMounted: true }}
                >
                  <div className={classes.drawerContainer}>
                    <div className={classes.drawerContainer}>{children}</div>
                  </div>
                </SwipeableDrawer>
              </Hidden>
              <Hidden smDown>
                {/* show only on desktops */}
                <MDDrawer
                  className={classes.drawer}
                  classes={{ paper: classes.drawerPaper }}
                  open={drawerOpen}
                  variant="persistent"
                  anchor="left"
                >
                  <div className={c(classes.drawerContainer, classes.drawerContentTopPadding)} children={children} />
                </MDDrawer>
              </Hidden>
            </div>
          );
        }}
      </StateConsumer>
    );
  }
}

export const Drawer = withStyles(styles)(drawer);
