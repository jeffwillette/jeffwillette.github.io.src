import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  languages: AboutPage_site_siteMetadata_resume['languages'];
}

const languagesComponent = ({ languages }: Props) => (
  <div>
    language
    <div>{JSON.stringify(languages)}</div>
  </div>
);

export const Languages = withStyles(styles)(languagesComponent);
