import React, { useEffect, useState } from 'react';
import { Header } from './header';

import { Collapse, List, ListItem, ListItemIcon, ListItemText, Theme, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { ExpandLess, ExpandMore, LibraryBooks, Web } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { MDXProvider } from '@mdx-js/react';
import c from 'classnames';
import { navigate } from 'gatsby';
import { StateConsumer } from '../../context';
import { themeAddons } from '../../theme';
import { AutolinkHeader, AutolinkHeaderProps } from '../AutolinkHeader';
import { BlockQuote, BlockQuoteProps } from '../blockquote';
import { Code, CodeProps } from '../code';
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
  code: {
    backgroundColor: `rgba(0,0,0,.1)`,
    color: `rgba(0,0,0,.5)`,
    borderRadius: 3,
    margin: theme.spacing(1 / 4),
    padding: theme.spacing(1 / 2),
    fontSize: '1.0em'
  },
  ul: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: 'flex',
    flexDirection: 'column',
    '& ul': {
      borderLeft: themeAddons.greenOutline,
      padding: theme.spacing(1),
      backgroundColor: themeAddons.greenBg,
      borderRadius: 5,
      listStyle: 'none'
    },
    '& ul li': {
      fontSize: '1.0em',
      position: 'relative',
      left: theme.spacing(3),
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
      '&:before': {
        fontSize: '1.2em',
        fontWeight: 'bold',
        padding: `0px ${theme.spacing(1) - 1}px`,
        borderRadius: '50%',
        content: '"❯"',
        color: 'rgba(0,0,0,.5)',
        backgroundColor: theme.palette.divider,
        position: 'absolute',
        left: theme.spacing(-3)
      }
    }
  },
  ol: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: 'flex',
    flexDirection: 'column',
    '& ol': {
      borderLeft: themeAddons.greenOutline,
      backgroundColor: themeAddons.greenBg,
      padding: theme.spacing(1),
      borderRadius: 5,
      listStyle: 'none',
      counterReset: 'ol-counter'
    },
    '& ol li': {
      counterIncrement: 'ol-counter',
      fontSize: '1.0em',
      position: 'relative',
      left: theme.spacing(3),
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
      '&:before': {
        fontSize: '1.2em',
        fontWeight: 'bold',
        content: 'counter(ol-counter)',
        padding: `${theme.spacing(1) / 4}px ${theme.spacing(1)}px`,
        borderRadius: '50%',
        backgroundColor: `rgba(0,0,0,.05)`,
        color: `rgba(0,0,0,.4)`,
        position: 'absolute',
        left: theme.spacing(-3),
        top: 4
      }
    }
  },
  nestedList: {
    paddingLeft: theme.spacing(4)
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

  // the key in the top level component is important because it forces react to re-evaluate the styles on the first render.
  // without this, there will be erroring renders on the first paint in some situations.
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const components = {
    h1: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h1" />,
    h2: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h2" />,
    h3: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h3" />,
    h4: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h4" />,
    h5: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h5" />,
    h6: (props: AutolinkHeaderProps) => <AutolinkHeader {...props} variant="h6" />,
    p: (props: TypographyProps) => <Typography className={classes.postP} {...props} variant="body1" />,
    inlineCode: (props: React.HTMLProps<HTMLSpanElement>) => <span className={classes.code} {...props} />,
    code: (props: CodeProps) => <Code {...props} />,
    ul: (props: React.HTMLProps<HTMLUListElement>) => <div className={classes.ul} children={<ul {...props} />} />,
    // tslint:disable-next-line
    ol: (props: any) => <div className={classes.ol} children={<ol {...props} />} />,
    blockquote: (props: BlockQuoteProps) => <BlockQuote {...props} />
  };

  return (
    <MDXProvider components={components} key={isClient}>
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
          const cl = c(classes.content, {
            [classes.contentShift]: drawerOpen && !mobile,
            [classes.contentPaddingOpen]: drawerOpen && !mobile,
            [classes.contentPadding]: !drawerOpen && !mobile,
            [classes.contentMobile]: mobile
          });

          return <main className={cl} children={children} />;
        }}
      </StateConsumer>
      <Footer />
    </MDXProvider>
  );
};
