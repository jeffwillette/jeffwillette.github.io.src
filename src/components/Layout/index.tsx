import * as React from 'react';
import Header from './Header';

import withRoot from '../../withRoot';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: JSX.Element[];
}

const DefaultLayout = ({ children }: Props) => (
  <div>
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0
      }}
    >
      {children}
    </div>
  </div>
);

export default withRoot(DefaultLayout);
