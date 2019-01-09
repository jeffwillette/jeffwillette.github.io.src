import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  skills: AboutPage_site_siteMetadata_resume['skills'];
}

const skillsComponent = ({ skills }: Props) => (
  <div>
    skills
    <div>{JSON.stringify(skills)}</div>
  </div>
);

export const Skills = withStyles(styles)(skillsComponent);
