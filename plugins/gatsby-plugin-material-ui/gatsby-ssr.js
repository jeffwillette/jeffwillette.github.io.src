import { ServerStyleSheets } from '@material-ui/styles';

// Keep track of sheets for each page
const globalLeak = new Map();

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  const sheets = new ServerStyleSheets(pluginOptions.stylesProvider);
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  // onRenderBody is called in develop mode. It's strange?
  // TODO: see if I should add this to the mui repo. they had if (!pathname)
  console.log(process.env.BUILD_STAGE);
  console.log(process.env);
  console.log(pathname);
  if (process.env.BUILD_STAGE === `develop-html`) {
    return;
  }

  const sheets = globalLeak.get(pathname);
  setHeadComponents([sheets.getStyleElement()]);
  globalLeak.delete(pathname);
};
