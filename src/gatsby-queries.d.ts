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
// GraphQL query operation: BlogQuery
// ====================================================

export interface BlogQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  title: string | null;
  description: string | null;
  keywords: string | null;
  author: string | null;
}

export interface BlogQuery_site {
  __typename: "Site";
  siteMetadata: BlogQuery_site_siteMetadata | null;
}

export interface BlogQuery_allMdx_edges_node_frontmatter {
  __typename: "frontmatter_2";
  title: string | null;
  edited: any | null;
  created: any | null;
  categories: (string | null)[] | null;
}

export interface BlogQuery_allMdx_edges_node_fields {
  __typename: "fields_2";
  slug: string | null;
}

export interface BlogQuery_allMdx_edges_node {
  __typename: "Mdx";
  frontmatter: BlogQuery_allMdx_edges_node_frontmatter | null;
  fields: BlogQuery_allMdx_edges_node_fields | null;
  timeToRead: number | null;
  excerpt: string | null;
}

export interface BlogQuery_allMdx_edges {
  __typename: "MdxEdge";
  /**
   * The item at the end of the edge
   */
  node: BlogQuery_allMdx_edges_node | null;
}

export interface BlogQuery_allMdx {
  __typename: "MdxConnection";
  /**
   * A list of edges.
   */
  edges: (BlogQuery_allMdx_edges | null)[] | null;
}

export interface BlogQuery {
  site: BlogQuery_site | null;
  /**
   * Connection to all Mdx nodes
   */
  allMdx: BlogQuery_allMdx | null;
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

// ====================================================
// GraphQL query operation: BlogPostQuery
// ====================================================

export interface BlogPostQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  author: string | null;
}

export interface BlogPostQuery_site {
  __typename: "Site";
  siteMetadata: BlogPostQuery_site_siteMetadata | null;
}

export interface BlogPostQuery_mdx_frontmatter {
  __typename: "frontmatter_2";
  title: string | null;
  created: any | null;
  edited: any | null;
  categories: (string | null)[] | null;
}

export interface BlogPostQuery_mdx_code {
  __typename: "MDXCodeMdx";
  body: string | null;
}

export interface BlogPostQuery_mdx {
  __typename: "Mdx";
  frontmatter: BlogPostQuery_mdx_frontmatter | null;
  code: BlogPostQuery_mdx_code | null;
  timeToRead: number | null;
  tableOfContents: any | null;
  excerpt: string | null;
}

export interface BlogPostQuery {
  site: BlogPostQuery_site | null;
  mdx: BlogPostQuery_mdx | null;
}

export interface BlogPostQueryVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
