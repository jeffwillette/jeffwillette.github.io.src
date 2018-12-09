import { createGenerateClassName, createMuiTheme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import { SheetsRegistry } from 'react-jss';

export interface PageContext {
  theme: any;
  sheetsManager: Map<any, any>;
  sheetsRegistry: any;
  generateClassName: any;
}

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: grey,
    error: {
      light: 'rgba(128,0,0,.9)',
      main: 'rgba(128,0,0,.9)',
      dark: 'rgba(128,0,0,.9)',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 5
      }
    },
    MuiPaper: {
      root: {
        boxShadow:
          '0px 1px 1px -1px rgba(0, 0, 0, 0.2),' +
          '0px 3px 1px -1px rgba(0, 0, 0, 0.14),' +
          '0px 1px 1px -1px rgba(0, 0, 0, 0.12)'
      },
      rounded: {
        borderRadius: 5
      }
    }
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    useNextVariants: true,
    h1: {
      fontSize: '3rem',
      color: 'rgba(0,0,0,.54)'
    },
    h2: {
      fontSize: '2rem',
      color: 'rgba(0,0,0,.54)'
    },
    h3: {
      fontSize: '1.75rem',
      color: 'rgba(0,0,0,.54)'
    },
    h4: {
      fontSize: '1.35rem',
      color: 'rgba(0,0,0,.54)'
    },
    h5: {
      fontSize: '1.25rem',
      color: 'rgba(0,0,0,.54)'
    },
    h6: {
      fontSize: '1.15rem',
      color: 'rgba(0,0,0,.54)'
    },
    blockquote: {
      color: 'blue'
    }
  }
});

const createPageContext = (): PageContext => {
  return {
    theme, // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(), // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(), // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
};

interface Process {
  browser: any;
}
declare var process: Process;

interface Global {
  __INIT_MATERIAL_UI__: any;
}

declare var global: Global;

const getPageContext = () => {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
};

export default getPageContext;
