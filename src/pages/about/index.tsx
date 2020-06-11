import { Avatar, makeStyles, Theme } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';
import { GlobalLayout } from '../../components/Layout/global';
import { AboutPage } from '../../gatsby-queries';
import { safe } from '../../utils';

interface Props {
  data: AboutPage;
}

const useStyles = makeStyles((_: Theme) => ({
  avatar: {
    width: 200,
    height: 200,
    margin: 'auto'
  }
}));

export default ({ data }: Props) => {
  const classes = useStyles();
  const { avatar } = safe(data);
  const { childImageSharp } = safe(avatar);
  const { fluid } = safe(childImageSharp);
  const { src } = safe(fluid);

  // const { siteMetadata } = safe(site);
  // const { resume } = safe(siteMetadata);
  // return <Resume resume={safe(resume)} />;

  return (
    <GlobalLayout>
      <Avatar src={src || undefined} className={classes.avatar} />
    </GlobalLayout>
  );
};

export const pageQuery = graphql`
  query AboutPage {
    avatar: file(name: { eq: "jeff" }, extension: { eq: "png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
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
