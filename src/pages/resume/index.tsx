import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';

const styles = (_: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {}

const resume = ({ data }: Props) => <div>{JSON.stringify(data)}</div>;

export const pageQuery = graphql`
  query ResumeQuery {
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

export default withStyles(styles)(resume);
