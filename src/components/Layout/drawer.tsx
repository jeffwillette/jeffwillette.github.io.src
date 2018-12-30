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

export const drawerWidth = 280;

const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: theme.zIndex.drawer,
      marginTop: 65,
      overflowY: 'scroll',
      height: 'calc(100% - 64px)',
      borderRight: '0px solid'
    },
    drawerContent: {
      width: drawerWidth,
      alignContent: 'center',
      height: '101%',
      backgroundColor: 'rgba(0,0,0,.002)'
    },
    drawerContentTopPadding: {
      // the drawer comes under the bar on desktop so it needs some top padding
      paddingTop: 85
    },
    outerDiv: {
      marginTop: 65
    },
    drawerContainer: {
      height: '101%'
    }
  });

interface Props extends WithStyles<typeof styles> {
  children: JSX.Element | JSX.Element[] | Array<JSX.Element | JSX.Element[] | null>;
}

class Drawer extends React.Component<Props, {}> {
  public setOpen = () => console.log('setOpen called');

  public render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.outerDiv}>
        <Hidden mdUp>
          {/* show only on mobile screens */}
          <SwipeableDrawer
            open
            onOpen={() => this.setOpen()}
            onClose={() => this.setOpen()}
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
          <MDDrawer className={classes.drawer} open variant="permanent" anchor="left">
            <div className={c(classes.drawerContent, classes.drawerContentTopPadding)}>
              <div className={classes.drawerContent}>{children}</div>
            </div>
          </MDDrawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Drawer);
