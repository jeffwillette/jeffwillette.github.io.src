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
// GraphQL query operation: AboutPage
// ====================================================

export interface AboutPage_site_siteMetadata_resume_basics_location {
  __typename: "location_2";
  address: string | null;
  postalCode: string | null;
  city: string | null;
  countryCode: string | null;
  region: string | null;
}

export interface AboutPage_site_siteMetadata_resume_basics_profiles {
  __typename: "profiles_2";
  network: string | null;
  username: string | null;
  url: string | null;
}

export interface AboutPage_site_siteMetadata_resume_basics {
  __typename: "basics_2";
  name: string | null;
  label: string | null;
  picture: string | null;
  phone: string | null;
  website: string | null;
  summary: string | null;
  location: AboutPage_site_siteMetadata_resume_basics_location | null;
  profiles: (AboutPage_site_siteMetadata_resume_basics_profiles | null)[] | null;
}

export interface AboutPage_site_siteMetadata_resume_work {
  __typename: "work_2";
  company: string | null;
  position: string | null;
  website: string | null;
  startDate: any | null;
  endDate: any | null;
  summary: string | null;
  highlights: (string | null)[] | null;
}

export interface AboutPage_site_siteMetadata_resume_education {
  __typename: "education_2";
  institution: string | null;
  area: string | null;
  studyType: string | null;
  startDate: any | null;
  endDate: any | null;
  gpa: string | null;
  courses: (string | null)[] | null;
}

export interface AboutPage_site_siteMetadata_resume_awards {
  __typename: "awards_2";
  title: string | null;
  date: any | null;
  awarder: string | null;
  summary: string | null;
}

export interface AboutPage_site_siteMetadata_resume_publications {
  __typename: "publications_2";
  name: string | null;
  publisher: string | null;
  releaseDate: any | null;
  website: string | null;
  summary: string | null;
}

export interface AboutPage_site_siteMetadata_resume_skills {
  __typename: "skills_2";
  name: string | null;
  level: string | null;
  keywords: (string | null)[] | null;
}

export interface AboutPage_site_siteMetadata_resume_languages {
  __typename: "languages_2";
  name: string | null;
  level: string | null;
}

export interface AboutPage_site_siteMetadata_resume_interests {
  __typename: "interests_2";
  name: string | null;
  keywords: (string | null)[] | null;
}

export interface AboutPage_site_siteMetadata_resume_references {
  __typename: "references_2";
  name: string | null;
  reference: string | null;
}

export interface AboutPage_site_siteMetadata_resume {
  __typename: "resume_2";
  basics: AboutPage_site_siteMetadata_resume_basics | null;
  work: (AboutPage_site_siteMetadata_resume_work | null)[] | null;
  education: (AboutPage_site_siteMetadata_resume_education | null)[] | null;
  awards: (AboutPage_site_siteMetadata_resume_awards | null)[] | null;
  publications: (AboutPage_site_siteMetadata_resume_publications | null)[] | null;
  skills: (AboutPage_site_siteMetadata_resume_skills | null)[] | null;
  languages: (AboutPage_site_siteMetadata_resume_languages | null)[] | null;
  interests: (AboutPage_site_siteMetadata_resume_interests | null)[] | null;
  references: (AboutPage_site_siteMetadata_resume_references | null)[] | null;
}

export interface AboutPage_site_siteMetadata {
  __typename: "siteMetadata_2";
  resume: AboutPage_site_siteMetadata_resume | null;
}

export interface AboutPage_site {
  __typename: "Site";
  siteMetadata: AboutPage_site_siteMetadata | null;
}

export interface AboutPage {
  site: AboutPage_site | null;
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
  createdAt: any | null;
  updatedAt: any | null;
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

export interface BlogQueryVariables {
  skip: number;
  limit: number;
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

export interface BlogPostQuery_authorAvatar_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface BlogPostQuery_authorAvatar_childImageSharp {
  __typename: "ImageSharp";
  fluid: BlogPostQuery_authorAvatar_childImageSharp_fluid | null;
}

export interface BlogPostQuery_authorAvatar {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: BlogPostQuery_authorAvatar_childImageSharp | null;
}

export interface BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface BlogPostQuery_mdx_frontmatter_images_childImageSharp {
  __typename: "ImageSharp";
  fluid: BlogPostQuery_mdx_frontmatter_images_childImageSharp_fluid | null;
}

export interface BlogPostQuery_mdx_frontmatter_images {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: BlogPostQuery_mdx_frontmatter_images_childImageSharp | null;
}

export interface BlogPostQuery_mdx_frontmatter {
  __typename: "frontmatter_2";
  title: string | null;
  createdAt: any | null;
  updatedAt: any | null;
  categories: (string | null)[] | null;
  images: (BlogPostQuery_mdx_frontmatter_images | null)[] | null;
}

export interface BlogPostQuery_mdx_fields {
  __typename: "fields_2";
  githubLink: string | null;
}

export interface BlogPostQuery_mdx_code {
  __typename: "MDXCodeMdx";
  body: string | null;
}

export interface BlogPostQuery_mdx {
  __typename: "Mdx";
  frontmatter: BlogPostQuery_mdx_frontmatter | null;
  fields: BlogPostQuery_mdx_fields | null;
  code: BlogPostQuery_mdx_code | null;
  timeToRead: number | null;
  tableOfContents: any | null;
  excerpt: string | null;
}

export interface BlogPostQuery {
  site: BlogPostQuery_site | null;
  authorAvatar: BlogPostQuery_authorAvatar | null;
  mdx: BlogPostQuery_mdx | null;
}

export interface BlogPostQueryVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TagPage
// ====================================================

export interface TagPage_site_siteMetadata {
  __typename: "siteMetadata_2";
  title: string | null;
  description: string | null;
  keywords: string | null;
  author: string | null;
}

export interface TagPage_site {
  __typename: "Site";
  siteMetadata: TagPage_site_siteMetadata | null;
}

export interface TagPage_allMdx_edges_node_frontmatter {
  __typename: "frontmatter_2";
  title: string | null;
  createdAt: any | null;
  updatedAt: any | null;
  categories: (string | null)[] | null;
}

export interface TagPage_allMdx_edges_node_fields {
  __typename: "fields_2";
  slug: string | null;
}

export interface TagPage_allMdx_edges_node {
  __typename: "Mdx";
  frontmatter: TagPage_allMdx_edges_node_frontmatter | null;
  fields: TagPage_allMdx_edges_node_fields | null;
  timeToRead: number | null;
  excerpt: string | null;
}

export interface TagPage_allMdx_edges {
  __typename: "MdxEdge";
  /**
   * The item at the end of the edge
   */
  node: TagPage_allMdx_edges_node | null;
}

export interface TagPage_allMdx {
  __typename: "MdxConnection";
  /**
   * A list of edges.
   */
  edges: (TagPage_allMdx_edges | null)[] | null;
}

export interface TagPage {
  site: TagPage_site | null;
  /**
   * Connection to all Mdx nodes
   */
  allMdx: TagPage_allMdx | null;
}

export interface TagPageVariables {
  tagRegex?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed
// ====================================================

export interface GatsbyImageSharpFixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp
// ====================================================

export interface GatsbyImageSharpFixed_withWebp {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_noBase64 {
  __typename: "ImageSharpFixed";
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_noBase64 {
  __typename: "ImageSharpFixed";
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid
// ====================================================

export interface GatsbyImageSharpFluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp
// ====================================================

export interface GatsbyImageSharpFluid_withWebp {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions
// ====================================================

export interface GatsbyImageSharpResolutions {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes
// ====================================================

export interface GatsbyImageSharpSizes {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp
// ====================================================

export interface GatsbyImageSharpSizes_withWebp {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
