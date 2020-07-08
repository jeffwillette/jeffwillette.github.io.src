import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 75,
    height: 75,
  },
  icon: {
    color: theme.palette.primary.main,
    paddingLeft: 10,
  },
  name: {
    fontSize: 24,
    paddingLeft: 10,
  },
  secondary: {
    fontSize: 18,
    paddingLeft: 10,
  },
}));
