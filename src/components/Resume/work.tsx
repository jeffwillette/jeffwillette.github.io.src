import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  work: AboutPage_site_siteMetadata_resume['work'];
}

export const Work = ({ work }: Props) => (
  <div>
    work
    <div>{JSON.stringify(work)}</div>
  </div>
);
