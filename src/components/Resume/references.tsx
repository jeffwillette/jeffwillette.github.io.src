import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  references: AboutPage_site_siteMetadata_resume['references'];
}

export const References = ({ references }: Props) => (
  <div>
    references
    <div>{JSON.stringify(references)}</div>
  </div>
);
