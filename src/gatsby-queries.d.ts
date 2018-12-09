/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeaderQuery
// ====================================================

export interface HeaderQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  twitter: string | null;
  github: string | null;
}

export interface HeaderQuery_site {
  __typename: "Site";
  siteMetadata: HeaderQuery_site_siteMetadata | null;
}

export interface HeaderQuery {
  site: HeaderQuery_site | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexQuery
// ====================================================

export interface IndexQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  title: string | null;
  description: string | null;
  keywords: string | null;
  author: string | null;
}

export interface IndexQuery_site {
  __typename: "Site";
  siteMetadata: IndexQuery_site_siteMetadata | null;
}

export interface IndexQuery {
  site: IndexQuery_site | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
