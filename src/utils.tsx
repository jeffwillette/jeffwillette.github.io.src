import React from 'react';
import { StateConsumer } from './context';

export const safe = <T extends {}>(obj: T | null): T => {
  return obj ? (obj as T) : ({} as T);
};

export const withDrawerOpen = Component => props => (
  <StateConsumer>{({ drawerOpen }) => <Component drawerOpen={drawerOpen} {...props} />}</StateConsumer>
);
