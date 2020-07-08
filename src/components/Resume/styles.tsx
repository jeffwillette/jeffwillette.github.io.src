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
  tags: {
    marginTop: 5,
    marginLeft: -5,
  },
  heading: {
    marginLeft: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  list: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
  },
}));
