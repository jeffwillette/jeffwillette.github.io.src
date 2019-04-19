import React, { useState } from 'react';
import { Header } from './header';

import {
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore, LibraryBooks, Web } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/react';
import c from 'classnames';
import { navigate } from 'gatsby';
import { ContextProvider, StateConsumer } from '../../context';
import { AutolinkHeader } from '../AutolinkHeader';
import { BlockQuote } from '../blockquote';
import { Code } from '../code';
import { DisplayCard } from '../displayCard';
import { Drawer, drawerWidth } from './drawer';
import { Footer } from './footer';

const useStyles = makeStyles((theme: Theme) => ({
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
  ul: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    '& ul': {
      borderLeft: `5px solid ${theme.palette.divider}`,
      listStyle: 'none'
    },
    '& ul li': {
      ...theme.typography.h5,
      fontSize: '1.0em',
      padding: theme.spacing(1),
      position: 'relative',
      '&:before': {
        padding: `0px ${theme.spacing(1) - 1}px`,
        borderRadius: '50%',
        content: '"❯"',
        color: 'rgba(0,0,0,.5)',
        backgroundColor: theme.palette.divider,
        position: 'absolute',
        left: -26
      }
    }
  },
  ol: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    '& ol': {
      borderLeft: `5px solid ${theme.palette.divider}`,
      listStyle: 'none',
      counterReset: 'ol-counter'
    },
    '& ol li': {
      ...theme.typography.h5,
      counterIncrement: 'ol-counter',
      fontSize: '1.0em',
      padding: theme.spacing(1),
      position: 'relative',
      '&:before': {
        content: 'counter(ol-counter)',
        padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
        borderRadius: '50%',
        color: 'rgba(0,0,0,.5)',
        backgroundColor: theme.palette.divider,
        position: 'absolute',
        left: -28,
        top: 7
      }
    }
  },
  nestedList: {
    paddingLeft: theme.spacing(4)
  },
  blockquote: {
    fontStyle: 'italic'
  },
  content: {
    flexGrow: 1,
    minHeight: 320, // gives enough room for the footer
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentPadding: { padding: `0px ${theme.spacing(30)}px` },
  contentPaddingOpen: {
    padding: `0px ${theme.spacing(20)}px`
  },
  contentMobile: { padding: `${theme.spacing(5)}px ${theme.spacing(1.5)}px` },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  },
  postP: {
    margin: `${theme.spacing(3)}px 0px`
  }
}));

interface Props {
  drawer?: React.ReactNode;
  children: React.ReactNode;
}

export const GlobalLayout = ({ drawer, children }: Props) => {
  const [defaultItemOpen, toggleDefaultItem] = useState(false);
  const classes = useStyles();

  const components = {
    h1: props => <AutolinkHeader {...props} variant="h1" />,
    h2: props => <AutolinkHeader {...props} variant="h2" />,
    h3: props => <AutolinkHeader {...props} variant="h3" />,
    h4: props => <AutolinkHeader {...props} variant="h4" />,
    h5: props => <AutolinkHeader {...props} variant="h5" />,
    h6: props => <AutolinkHeader {...props} variant="h6" />,
    p: props => <Typography className={classes.postP} {...props} variant="body1" />,
    code: props => <Code {...props} />,
    ul: props => <div className={classes.ul} children={<ul {...props} />} />,
    ol: props => <div className={classes.ol} children={<ol {...props} />} />,
    blockquote: props => <BlockQuote {...props} />
  };

  return (
    <MDXProvider components={components}>
      <ContextProvider>
        <Header />
        <Drawer>
          <List>
            <ListItem button onClick={() => toggleDefaultItem(!defaultItemOpen)}>
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
                <ListItem className={classes.nestedList} button onClick={() => navigate('/about/')}>
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText>About</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
          {drawer}
        </Drawer>
        <StateConsumer>
          {({ mobile, drawerOpen }) => {
            return (
              <main
                className={c(classes.content, {
                  [classes.contentShift]: drawerOpen && !mobile,
                  [classes.contentPaddingOpen]: drawerOpen && !mobile,
                  [classes.contentPadding]: !drawerOpen && !mobile,
                  [classes.contentMobile]: mobile
                })}
                children={children}
              />
            );
          }}
        </StateConsumer>
        <Footer />
      </ContextProvider>
    </MDXProvider>
  );
};
