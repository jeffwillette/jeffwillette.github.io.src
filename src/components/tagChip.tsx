import { Chip, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { navigate } from 'gatsby';
import GithubSlugger from 'github-slugger';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: `0px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`
    }
  });

interface Props extends WithStyles<typeof styles> {
  tag: string;
}

const slugger = new GithubSlugger();

const tagChip = ({ classes, tag }: Props) => {
  // I can make the slug here because this is the same thing that gatsby node does. If this
  // slugs to the same thing, then it should go to the right place
  const tagSlug = slugger.slug(tag);
  slugger.reset();

  return (
    <Chip
      clickable
      onClick={() => navigate(`/tags/${tagSlug}`)}
      variant="outlined"
      className={classes.chip}
      label={tag}
    />
  );
};

export const TagChip = withStyles(styles)(tagChip);
