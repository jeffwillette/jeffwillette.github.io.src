import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

interface Props {
  interests: AboutPage_site_siteMetadata_resume['interests'];
}

export const Interests = ({ interests }: Props) => (
  <div>
    interests
    <div>{JSON.stringify(interests)}</div>
  </div>
);
