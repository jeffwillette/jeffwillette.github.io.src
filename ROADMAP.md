I would like this to eventually be a solid developer blog that anyone can use

TODO:

- add a tooltip for `copy link to clipboard`

- add a feed from twitter
  - this should probably go on the main page
  - if there is no twitter account in the siteMetadata then don't show anything

- design the main page with recent tweets, blogposts, etc

- add a resume page.
  - style the resume page

- write post about getting typescript types with the lookup (like on my SO question)

- write post about node peerDependencies
  - delete resolutions in gatsby package.json to make the error happen
  - grep through the node modules and pipe to less to see what uses grpahql
  - write the resolutions and run again to see it fixed
  - ask others for opinions

- styles
  - if I don't need it, remove gatsby-plugin-remove-serviceworker
  - add gatsby-plugin-offline if I can
  - put the hydrator back in gatsby browser
  - follow the comment https://github.com/gatsbyjs/gatsby/issues/8237 here and try to mimic his example

- make folder for each post
  - make dir based on the markdown filename
  - mov the file into the dir and rename it index
  - go through and find all that have images and copy them into the dir
  - change the media location to the current dir
  - redo gatsby-node to do whatever it needs to make the paths work for the new system of dirs

- after post recover is finished
  - take createdAt date replace out of nvim-deltaskelta

- look into tree shaking
  - if there is no way to tree shake styles, import only what is needed from syntax-highlighter in code component
