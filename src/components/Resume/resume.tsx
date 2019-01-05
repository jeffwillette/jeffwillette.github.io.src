import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { safe } from '../../utils';
import { GlobalLayout } from '../Layout/global';
import { Basics } from './basic';
import { Work } from './work';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  resume: AboutPage_site_siteMetadata_resume;
}

const resumeComponent = ({ resume }: Props) => {
  const { basics, work, education, skills, interests, languages, references } = safe(resume);
  return (
    <GlobalLayout>
      <Basics basics={basics} />
      <Work work={work} />
      <Education education={education} />
      <Skills skills={skills} />
      <Interests interests={interests} />
      <Language languages={languages} />
      <References references={references} />
      <Publications publications={publications} />
    </GlobalLayout>
  );
};

export const Resume = withStyles(styles)(resumeComponent);
