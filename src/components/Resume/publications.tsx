import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume_publications } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  publications: AboutPage_site_siteMetadata_resume_publications;
}

const publicationsComponent = ({ publications }: Props) => (
  <div>
    publications
    <div>{JSON.stringify(publications)}</div>
  </div>
);

export const Publications = withStyles(styles)(publicationsComponent);
