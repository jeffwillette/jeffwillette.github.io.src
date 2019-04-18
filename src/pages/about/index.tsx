import { graphql } from 'gatsby';
import React from 'react';
import { GlobalLayout } from '../../components/Layout/global';
import resumePDF from '../../jeff-willette-site.pdf';

// interface Props {
//   data: AboutPage;
// }

// TODO: change this to query file from graphql and put the resume in the data folder

export default () => {
  // const { site } = safe(data);
  // const { siteMetadata } = safe(site);
  // const { resume } = safe(siteMetadata);
  // return <Resume resume={safe(resume)} />;
  return (
    <GlobalLayout>
      <embed width="100%" height="1000px" src={resumePDF} />
    </GlobalLayout>
  );
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
