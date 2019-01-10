import { createGenerateClassName, createMuiTheme, Theme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import { GenerateId, SheetsRegistry as SheetsRegistryType } from 'jss';
import { SheetsRegistry } from 'react-jss';

export interface PageContext {
  theme: Theme;
  sheetsManager: Map<any, any>; // tslint:disable-line
  sheetsRegistry: SheetsRegistryType;
  generateClassName: GenerateId;
}

export const spacing = 8;

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
      rounded: {
        borderRadius: 5
      }
    }
  },
  spacing: {
    unit: spacing
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    useNextVariants: true,
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: 1.3,
      borderBottom: '1px solid rgba(0,0,0,.1)',
      color: 'rgba(0,0,0,.74)',
      margin: `${spacing * 3}px 0px`
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.74)',
      margin: `${spacing * 3}px 0px`
    },
    h3: {
      fontSize: '1.17rem',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.74)',
      margin: `${spacing * 3}px 0px`
    },
    h4: {
      fontSize: '1.12rem',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.74)',
      margin: `${spacing * 3}px 0px`
    },
    h5: {
      fontSize: '0.83rem',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.74)'
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.74)'
    },
    body1: {
      // margin: `${spacing * 2}px 0px`
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
  browser: any; // tslint:disable-line
}
declare var process: Process;

interface Global {
  __INIT_MATERIAL_UI__: any; // tslint:disable-line
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
