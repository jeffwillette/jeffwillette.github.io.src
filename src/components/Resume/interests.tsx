import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume_interests } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  interests: AboutPage_site_siteMetadata_resume_interests;
}

const interests = (_: Props) => (
  <div>
    interests
    <div>{JSON.stringify(interests)}</div>
  </div>
);

export const Basics = withStyles(styles)(interests);
