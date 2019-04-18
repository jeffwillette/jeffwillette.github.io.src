import { makeStyles, Theme } from '@material-ui/core';
import { navigate } from 'gatsby';
import React from 'react';
import { safe } from '../utils';
import { BlogPageProps } from './blogPage';
import { FlatFab } from './flatFab';

const useStyles = makeStyles((_: Theme) => ({
  pages: {
    textAlign: 'center'
  }
}));

interface Props {
  show: number;
  pageContext: BlogPageProps['pageContext'];
}

// the page number to show should be odd so there is a center...
export const Pages = ({ show, pageContext }: Props) => {
  const classes = useStyles();
  const { page, pageSlugs } = safe(pageContext);

  // center is the center page number, limbs are the number on each side of the center.
  // for show = 5 => 1, 2, 3 (center), 4, 5
  const center = Math.ceil(show / 2);
  const limbs = Math.floor(show / 2);

  const startIndex = page - limbs < 0 ? 0 : page - limbs - 1;
  const endIndex = startIndex + show;
  const pages = pageSlugs.slice(startIndex, endIndex);

  const canGoBack = page > center; // show = 5 => 2, 3, 4, 5, 6 => 4 > 3
  const canGoForward = pageSlugs.length > page + limbs;

  return (
    <div className={classes.pages}>
      {canGoBack && <FlatFab onClick={() => navigate(pageSlugs[startIndex - 1].path)} size="small" children="❮" />}
      {pages.map(obj => {
        return (
          <FlatFab
            disabled={page === obj.page}
            onClick={() => navigate(obj.path)}
            size="small"
            key={obj.page}
            children={obj.page}
          />
        );
      })}
      {canGoForward && <FlatFab onClick={() => navigate(pageSlugs[endIndex].path)} size="small" children="❯" />}
    </div>
  );
};
