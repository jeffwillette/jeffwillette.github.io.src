import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import { Link as GatsbyLink } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const styles = () =>
  createStyles({
    white: {
      color: 'white !important',
      '&:hover': {
        color: 'rgba(255,255,255,.9) !important'
      }
    },
    link: {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.5)',
      fontWeight: 'bold',
      '&:hover': {
        color: 'rgba(0,0,0,.65)'
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  to: string;
  children: string | JSX.Element;
  className?: string;
  white?: boolean;
}

interface State {}

class Link extends React.Component<Props, State> {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  otherInternalPage = /^\/(?!\/)/.test(this.props.to);
  samePageAnchor = /^#.*/.test(this.props.to);

  // TODO: this copies the text to the clipboard. It might be good to make a tooltip or something
  // that shows the user they can copy it to the clipboard and then copy it
  // I think this can probably be done with a ref to make it cleaner looking
  copyToClipboard = (v: string) => {
    const el = document.createElement('textarea');
    document.body.appendChild(el);
    el.value = v;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    const { to, children, classes, white } = this.props;
    const className = c(classes.link, { [classes.white]: white });

    switch (true) {
      case this.otherInternalPage:
        return <GatsbyLink to={to} children={children} className={className} />;
      case this.samePageAnchor:
        return (
          <AnchorLink
            href={to}
            // set the timeout to let the smooth scrolling happen and then insert the link into the browser
            onClick={() => setTimeout(() => (window ? (window.location.hash = to) : null), 1000)}
            className={className}
            children={children}
          />
        );
      default:
        return <a className={c(className)} href={to} children={children} />;
    }
  }
}

export default withStyles(styles)(Link);
