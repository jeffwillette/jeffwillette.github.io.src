import { Chip, makeStyles, Theme } from '@material-ui/core';
import { navigate } from 'gatsby';
import GithubSlugger from 'github-slugger';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: `0px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`
  }
}));

interface Props {
  tag: string;
}

const slugger = new GithubSlugger();

export const TagChip = ({ tag }: Props) => {
  const classes = useStyles();

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
