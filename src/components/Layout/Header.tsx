import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { KeyboardArrowLeft, Menu } from '@material-ui/icons';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { StateConsumer } from '../../context';
import { HeaderQuery } from '../../gatsby-queries';
import { safe } from '../../utils';
import { Link } from '../link';

const useStyles = makeStyles((theme: Theme) => ({
  right: {
    marginRight: theme.spacing(2)
  },
  flex: {
    flexGrow: 1
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  bar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menu: {
    fontSize: theme.typography.fontSize * 2.5,
    fontWeight: 'bold',
    marginRight: theme.spacing(1)
  },
  title: {
    ...theme.typography.h4,
    color: 'rgba(255,255,255,1)',
    margin: `0px 0px`
  },
  titleMobile: {
    ...theme.typography.h5,
    color: 'rgba(255,255,255,1)',
    margin: `0px 0px`
  }
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query HeaderQuery {
          site {
            siteMetadata {
              twitter
              github
            }
          }
        }
      `}
    >
      {(data: HeaderQuery) => {
        const { site } = safe(data);
        const { siteMetadata } = safe(site);
        const { twitter, github } = safe(siteMetadata);

        return (
          <StateConsumer>
            {({ mobile, drawerOpen, toggleDrawer }) => (
              <AppBar position="fixed" className={classes.bar} elevation={0}>
                <Toolbar>
                  {drawerOpen ? (
                    <KeyboardArrowLeft className={classes.menu} onClick={toggleDrawer} />
                  ) : (
                    <Menu className={classes.menu} onClick={toggleDrawer} />
                  )}
                  <Typography className={classes.flex}>
                    <Link to="/" white className={classes.link}>
                      <span className={mobile ? classes.titleMobile : classes.title} children="deltaskelta.github.io" />
                    </Link>
                  </Typography>
                  <Link to={twitter || ''} white>
                    <FontAwesomeIcon size="2x" icon={faTwitter} className={classes.right} />
                  </Link>
                  <Link to={github || ''} white>
                    <FontAwesomeIcon size="2x" icon={faGithub} className={classes.right} />
                  </Link>
                </Toolbar>
              </AppBar>
            )}
          </StateConsumer>
        );
      }}
    </StaticQuery>
  );
};
