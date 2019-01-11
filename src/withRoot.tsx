import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import React from 'react';

import getPageContext, { PageContext } from './getPageContext';

interface Props {
  pageContext: PageContext;
}

const withRoot = (Component: React.SFC) => {
  class WithRoot extends React.Component<Props, {}> {
    public pageContext = {} as PageContext;
    constructor(props: Props) {
      super(props);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    // TODO: this is removed because it seems to cause issues on the
    // build where the styles are applied and then they are changed
    // somehow and all of the css is gone.
    // - make a local build
    // - serve public with node server
    // - clear the cache for the app
    // - refresh the page
    // public componentDidMount() {
    //  // Remove the server-side injected CSS.
    //  const jssStyles = document.querySelector('#server-side-jss');
    //  if (jssStyles && jssStyles.parentNode) {
    //    jssStyles.parentNode.removeChild(jssStyles);
    //  }
    // }

    public render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return WithRoot;
};

export default withRoot;
