import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { AppBar, Toolbar, Typography, Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import A from '../a';
import { HeaderQuery, HeaderQuery_site, HeaderQuery_site_siteMetadata } from '../../gatsby-queries';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    right: {
      marginRight: theme.spacing.unit * 2
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
    }
  });

const Header = ({ classes }: Props) => (
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
      const { site } = data;
      const { siteMetadata } = site || ({} as HeaderQuery_site);
      const { twitter, github } = siteMetadata || ({} as HeaderQuery_site_siteMetadata);

      // TODO: stopped here, put the appbar index in the css API
      return (
        <AppBar position="fixed" className={classes.bar}>
          <Toolbar>
            <Typography variant="h3" className={classes.flex}>
              <Link to="/" className={classes.link}>
                deltaskelta.github.io
              </Link>
            </Typography>

            <A href={twitter || ''} white>
              <FontAwesomeIcon size="2x" icon={faTwitter} className={classes.right} />
            </A>
            <A href={github || ''} white>
              <FontAwesomeIcon size="2x" icon={faGithub} className={classes.right} />
            </A>
          </Toolbar>
        </AppBar>
      );
    }}
  </StaticQuery>
);

export default withStyles(styles)(Header);
