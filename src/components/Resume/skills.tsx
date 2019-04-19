import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  skills: AboutPage_site_siteMetadata_resume['skills'];
}

export const Skills = ({ skills }: Props) => (
  <div>
    skills
    <div>{JSON.stringify(skills)}</div>
  </div>
);
