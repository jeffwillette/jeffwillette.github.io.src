import * as React from 'react';
import { Header } from './header';

import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { ExpandLess, ExpandMore, LibraryBooks, Web } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/tag';
import c from 'classnames';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import { ContextProvider, StateConsumer } from '../../context';
import withRoot from '../../withRoot';
import { AutolinkHeader } from '../AutolinkHeader';
import { Code } from '../code';
import { Drawer, drawerWidth } from './drawer';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.4em'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
    nestedList: {
      paddingLeft: theme.spacing.unit * 4
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentPadding: { padding: `0px ${theme.spacing.unit * 30}px` },
    contentPaddingOpen: { padding: `0px ${theme.spacing.unit * 10}px` },
    contentMobile: { padding: `0px ${theme.spacing.unit * 1.5}px` },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    }
  });

interface Props {
  drawer: JSX.Element | JSX.Element[];
}

interface ExtendedProps extends Props, React.HTMLProps<HTMLDivElement>, WithStyles<typeof styles> {}

interface State {
  defaultItemOpen: boolean;
}

class globalLayout extends React.Component<ExtendedProps, State> {
  public state = {
    defaultItemOpen: false
  };

  public toggleDefaultItem = () => this.setState(prevState => ({ defaultItemOpen: !prevState.defaultItemOpen }));

  public render() {
    const { defaultItemOpen } = this.state;
    const { drawer, classes, children } = this.props;
    return (
      <ContextProvider>
        <MDXProvider
          components={{
            h1: props => <AutolinkHeader {...props} variant="h1" />,
            h2: props => <AutolinkHeader {...props} variant="h2" />,
            h3: props => <AutolinkHeader {...props} variant="h3" />,
            h4: props => <AutolinkHeader {...props} variant="h4" />,
            h5: props => <AutolinkHeader {...props} variant="h5" />,
            h6: props => <AutolinkHeader {...props} variant="h6" />,
            p: props => <Typography {...props} variant="body1" />,
            code: props => <Code {...props} />
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
                  <ListItem className={classes.nestedList} button onClick={() => navigate('/blog/')}>
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
          <StateConsumer>
            {({ mobile, drawerOpen }) => (
              <main
                className={c(classes.content, {
                  [classes.contentShift]: drawerOpen && !mobile,
                  [classes.contentPaddingOpen]: drawerOpen && !mobile,
                  [classes.contentPadding]: !drawerOpen && !mobile,
                  [classes.contentMobile]: mobile
                })}
              >
                {children}
              </main>
            )}
          </StateConsumer>
        </MDXProvider>
      </ContextProvider>
    );
  }
}

export const GlobalLayout = compose<ExtendedProps, Props>(
  withRoot,
  withStyles(styles)
)(globalLayout);
