import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  languages: AboutPage_site_siteMetadata_resume['languages'];
}

export const Languages = ({ languages }: Props) => (
  <div>
    language
    <div>{JSON.stringify(languages)}</div>
  </div>
);
