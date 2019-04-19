import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  education: AboutPage_site_siteMetadata_resume['education'];
}

export const Education = ({ education }: Props) => (
  <div>
    education
    <div>{JSON.stringify(education)}</div>
  </div>
);
