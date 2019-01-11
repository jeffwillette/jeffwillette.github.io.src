import ReactDOM from 'react-dom';

// this is put here to fix a problem with the material-ui method
// https://github.com/gatsbyjs/gatsby/issues/8237
export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback);
  };
};
