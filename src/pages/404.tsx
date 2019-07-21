import { makeStyles } from '@material-ui/core';
import React from 'react';
import { GlobalLayout } from '../components/Layout/global';

const useStyles = makeStyles((_: Theme) => ({
  content: {
    margin: 'auto'
  }
}));

const NotFoundPage = () => {
  const styles = useStyles();

  return (
    <GlobalLayout>
      <div className={styles.content}>
        <h1>NOT FOUND</h1>
        <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
      </div>
    </GlobalLayout>
  );
};

export default NotFoundPage;
