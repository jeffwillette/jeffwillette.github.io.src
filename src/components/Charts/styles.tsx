import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((_: Theme) => ({
  svgContainer: {
    width: '100%',
    paddingTop: '50%',
    position: 'relative'
  },
  svg: {
    position: 'absolute',
    top: 0,
    height: '100%',
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
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  center: {
    margin: 'auto'
  }
}));
