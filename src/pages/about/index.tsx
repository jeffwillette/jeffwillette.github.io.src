import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';
import { Resume } from '../../components/Resume/resume';
import { AboutPage } from '../../gatsby-queries';
import { safe } from '../../utils';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  data: AboutPage;
}

const About = ({ data }: Props) => {
  const { site } = safe(data);
  const { siteMetadata } = safe(site);
  const { resume } = safe(siteMetadata);
  return <Resume resume={resume} />;
};

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        resume {
          basics {
            name
            label
            picture
            phone
            website
            summary
            location {
              address
              postalCode
              city
              countryCode
              region
            }
            profiles {
              network
              username
              url
            }
          }
          work {
            company
            position
            website
            startDate
            endDate
            summary
            highlights
          }
          education {
            institution
            area
            studyType
            startDate
            endDate
            gpa
            courses
          }
          awards {
            title
            date
            awarder
            summary
          }
          publications {
            name
            publisher
            releaseDate
            website
            summary
          }
          skills {
            name
            level
            keywords
          }
          languages {
            name
            level
          }
          interests {
            name
            keywords
          }
          references {
            name
            reference
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(About);
