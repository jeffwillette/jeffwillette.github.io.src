import React from 'react';

const Context = React.createContext({} as AppState);

interface AppState {
  drawerOpen: boolean;
  mobile: boolean;
  toggleDrawer(): void;
}

const defaultState = {
  drawerOpen: false,
  mobile: false
};

export class ContextProvider extends React.Component<{}, AppState> {
  public isMobileWidth = typeof window !== 'undefined' ? window.innerWidth < 960 : false;
  public stateMethods = {
    toggleDrawer: () => this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen })),
    toggleMobile: () => this.setState(prevState => ({ mobile: !prevState.mobile }))
  };

  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      ...this.stateMethods,
      mobile: this.isMobileWidth
    };
  }

  public componentDidUpdate() {
    if (this.isMobileWidth !== this.state.mobile) {
      this.stateMethods.toggleMobile();
    }
  }

  public render() {
    return <Context.Provider value={this.state} children={this.props.children} />;
  }
}

interface Props {
  children(value: AppState): React.ReactNode;
}

export const StateConsumer = ({ children }: Props) => <Context.Consumer>{value => children(value)}</Context.Consumer>;
