import { JssProvider } from 'react-jss';
import { renderToString } from 'react-dom/server';
import React from 'react';

import getPageContext from './src/getPageContext';

// see https://github.com/mui-org/material-ui/blob/master/examples/gatsby/gatsby-ssr.js
// to see how the MUI SSR works
export const replaceRenderer = ({ bodyComponent, setHeadComponents, replaceBodyHTMLString }) => {
  const pageContext = getPageContext();

  const bodyHTML = renderToString(
    <JssProvider registry={pageContext.sheetsRegistry} generateClassName={pageContext.generateClassName}>
      {React.cloneElement(bodyComponent, { pageContext })}
    </JssProvider>
  );

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{
        __html: pageContext.sheetsRegistry.toString()
      }}
    />
  ]);
};
