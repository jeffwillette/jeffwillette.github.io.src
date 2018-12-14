import React from 'react';
import { createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import GithubSlugger from 'github-slugger';
import Link from './link';

const styles = () =>
  createStyles({
    h: {
      '&::before': {
        content: '""',
        display: 'block',
        height: 100,
        marginTop: -100
      }
    }
  });

interface Props extends WithStyles<typeof styles>, TypographyProps {
  children: string;
}

const AutolinkHeader = ({ classes, children, variant }: Props) => {
  // I have to call new slugger here otherwise on a re-render it will append a 1
  const slug = new GithubSlugger().slug(children);

  return (
    <Link to={`#${slug}`}>
      <Typography classes={{ root: classes.h }} id={slug} variant={variant} children={children} />
    </Link>
  );
};

export default withStyles(styles)(AutolinkHeader);
