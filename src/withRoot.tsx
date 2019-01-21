import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import React from 'react';

import { JssProvider } from 'react-jss';
import getPageContext, { PageContext } from './getPageContext';

interface Props {
  pageContext: PageContext;
}

const withRoot = (Component: React.SFC) => {
  class WithRoot extends React.Component<Props, {}> {
    public pageContext = {} as PageContext;
    constructor(props: Props) {
      super(props);

      this.pageContext = getPageContext();
    }

    public componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    public render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <JssProvider generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...this.props} />
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
};

export default withRoot;
