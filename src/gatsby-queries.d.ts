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

export interface IndexQuery_allFile_edges_node {
  __typename: "File";
  /**
   * The id of this node.
   */
  id: string;
  modifiedTime: any | null;
}

export interface IndexQuery_allFile_edges {
  __typename: "FileEdge";
  /**
   * The item at the end of the edge
   */
  node: IndexQuery_allFile_edges_node | null;
}

export interface IndexQuery_allFile {
  __typename: "FileConnection";
  /**
   * A list of edges.
   */
  edges: (IndexQuery_allFile_edges | null)[] | null;
}

export interface IndexQuery {
  site: IndexQuery_site | null;
  /**
   * Connection to all File nodes
   */
  allFile: IndexQuery_allFile | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
