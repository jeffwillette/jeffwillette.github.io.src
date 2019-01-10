import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import GithubSlugger from 'github-slugger';
import React from 'react';
import { StateConsumer } from '../context';
import { Link } from './link';

const styles = (theme: Theme) =>
  createStyles({
    h: {
      '&::before': {
        content: '""',
        display: 'block',
        height: 100,
        marginTop: -100
      }
    },
    mobileFont: {
      fontSize: theme.typography.h2.fontSize + ' !important'
    }
  });

const slugger = new GithubSlugger();

// exclude classes form TypographyProps because I will put in the classes prop manually
// and spread the other props in as needed
export type AutolinkHeaderProps = WithStyles<typeof styles> &
  Exclude<TypographyProps, 'classes'> & {
    children: string;
  };

const autolinkHeader = ({ classes, children, variant }: AutolinkHeaderProps) => {
  // I have to call new slugger here otherwise on a re-render it will append a 1
  const slug = slugger.slug(children);
  slugger.reset();

  return (
    <Link to={`#${slug}`}>
      <StateConsumer>
        {({ mobile }) => {
          return (
            <Typography
              classes={{ root: classes.h }}
              className={variant === 'h1' && mobile ? classes.mobileFont : undefined}
              id={slug}
              variant={variant}
              children={children}
            />
          );
        }}
      </StateConsumer>
    </Link>
  );
};

export const AutolinkHeader = withStyles(styles)(autolinkHeader);
