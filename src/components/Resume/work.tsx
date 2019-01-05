import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume_work } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  work: AboutPage_site_siteMetadata_resume_work;
}

const work = (_: Props) => (
  <div>
    work
    <div>{JSON.stringify(work)}</div>
  </div>
);

export const Work = withStyles(styles)(work);
