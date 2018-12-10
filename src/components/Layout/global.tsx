import * as React from 'react';
import Header from './Header';

import withRoot from '../../withRoot';
import { compose } from 'recompose';
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  Typography,
  Collapse,
  ListItem,
  ListItemText,
  ListItemIcon,
  List
} from '@material-ui/core';
import Drawer from './drawer';
import { drawerWidth } from './drawer';
import './index.css';
import { Web, ExpandMore, ExpandLess, LibraryBooks } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/tag';

const styles = (theme: Theme) =>
  createStyles({
    outerContent: {
      margin: `0px 0px 0px ${drawerWidth}px`,
      padding: '0px 1.0875rem 1.45rem',
      paddingTop: theme.spacing.unit
    },
    innerContent: {
      padding: `0px ${theme.spacing.unit * 7}px`
    }
  });

interface Props extends React.HTMLProps<HTMLDivElement>, WithStyles<typeof styles> {
  children: JSX.Element[];
  drawer: JSX.Element | JSX.Element[];
}

interface State {
  defaultItemOpen: boolean;
}

class GlobalLayout extends React.Component<Props, State> {
  state = {
    defaultItemOpen: false
  };

  toggleDefaultItem = () => this.setState(prevState => ({ defaultItemOpen: !prevState.defaultItemOpen }));

  render() {
    const { defaultItemOpen } = this.state;
    const { drawer, classes, children } = this.props;
    return (
      <MDXProvider
        components={{
          h1: props => <Typography {...props} variant="h1" />,
          h2: props => <Typography {...props} variant="h2" />,
          h3: props => <Typography {...props} variant="h3" />,
          h4: props => <Typography {...props} variant="h4" />,
          h5: props => <Typography {...props} variant="h5" />,
          h6: props => <Typography {...props} variant="h6" />,
          p: props => <Typography {...props} variant="body1" />
        }}
      >
        <Header />
        <Drawer>
          <List>
            <ListItem button onClick={this.toggleDefaultItem}>
              <ListItemIcon>
                <Web />
              </ListItemIcon>
              <ListItemText>Sections</ListItemText>
              {defaultItemOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={defaultItemOpen}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText>Blog</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
          {drawer}
        </Drawer>
        <div className={classes.outerContent}>
          <div className={classes.innerContent}>{children}</div>
        </div>
      </MDXProvider>
    );
  }
}

export default compose<Props, any>(
  withRoot,
  withStyles(styles)
)(GlobalLayout);
