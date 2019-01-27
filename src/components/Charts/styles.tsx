import { createStyles, Theme } from '@material-ui/core';

export const styles = (_: Theme) =>
  createStyles({
    svg: {
      '& .yAxis path, & .xAxis path': {
        stroke: 'rgba(0,0,0,.2)',
        strokeWidth: 3,
        fill: 'none'
      },
      '& .tick line, & .tick text': {
        stroke: 'rgba(0,0,0,.2)',
        fill: 'rgba(0,0,0,.2)'
      },
      '& .line': {
        fill: 'none',
        strokeWidth: 4
      }
    }
  });
