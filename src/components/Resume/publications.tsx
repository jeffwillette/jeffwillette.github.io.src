import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  publications: AboutPage_site_siteMetadata_resume['publications'];
}

export const Publications = ({ publications }: Props) => (
  <div>
    publications
    <div>{JSON.stringify(publications)}</div>
  </div>
);
