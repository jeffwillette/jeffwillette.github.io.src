import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume_education } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  education: AboutPage_site_siteMetadata_resume_education;
}

const educationComponent = ({ education }: Props) => (
  <div>
    education
    <div>{JSON.stringify(education)}</div>
  </div>
);

export const Basics = withStyles(styles)(educationComponent);
