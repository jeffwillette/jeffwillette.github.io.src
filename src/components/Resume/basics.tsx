import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume_basics } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  basics: AboutPage_site_siteMetadata_resume_basics;
}

const basicsComponent = ({ basics }: Props) => (
  <div>
    basics
    <div>{JSON.stringify(basics)}</div>
  </div>
);

export const Basics = withStyles(styles)(basicsComponent);
