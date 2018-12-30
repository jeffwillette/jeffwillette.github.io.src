I would like this to eventually be a solid developer blog that anyone can use

TODO:

- add an 'edit this page on github' link
  - it should probably construct its link from the siteMetadata which contains a github repo?

- add a tooltip for `copy link to clipboard`

- add a feed from twitter
  - this should probably go on the main page
  - if there is no twitter account in the siteMetadata then don't show anything

- design the main page with recent tweets, blogposts, etc

- add a resume page. with `react-awesome-resume`
  - `react-awesome-resume` needs to be redesigned with gatsby in mind

- add categories pages
  - categories should show other posts with same categories
  - for `created at`, `edited at`, and `time to read` it should show posts with a similar range of values

- write post about compose and typescript
- write post about getting typescript types with the lookup (like on my SO question)
- write post about node peerDependencies
  - delete resolutions in gatsby package.json to make the error happen
  - grep through the node modules and pipe to less to see what uses grpahql
  - write the resolutions and run again to see it fixed
  - ask others for opinions
