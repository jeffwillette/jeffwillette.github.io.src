import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  basics: AboutPage_site_siteMetadata_resume['basics'];
}

export const Basics = ({ basics }: Props) => (
  <div>
    basics
    <div>{JSON.stringify(basics)}</div>
  </div>
);
