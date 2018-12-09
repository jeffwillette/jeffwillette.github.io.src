import * as React from "react";
import Link from "gatsby-link";
import GlobalLayout from "../components/Layout";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allFile: {
      edges: [
        {
          node: {
            id: string;
            modifiedTime: string;
          };
        }
      ];
    };
  };
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <GlobalLayout>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        <h1>Hi people</h1>
        <p>
          Welcome to your new{" "}
          <strong>{this.props.data.site.siteMetadata.title}</strong> site.
        </p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
        <div>
          <h1>Richard Hamming on Luck</h1>
          <div>
            <p>
              From Richard Hamming’s classic and must-read talk,{" "}
              <a href="http://www.cs.virginia.edu/~robins/YouAndYourResearch.html">
                You and Your Research
              </a>
              .
            </p>
            <blockquote>
              <p>
                There is indeed an element of luck, and no, there isn’t. The
                prepared mind sooner or later finds something important and does
                it. So yes, it is luck.{" "}
                <em>
                  The particular thing you do is luck, but that you do something
                  is not.
                </em>
              </p>
            </blockquote>
          </div>
          <p>Posted April 09, 2011</p>
        </div>
      </GlobalLayout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      edges {
        node {
          id
          modifiedTime
        }
      }
    }
  }
`;
