import { List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import c from 'classnames';
import React from 'react';
import { Link } from '../link';

const useStyles = makeStyles((theme: Theme) => ({
  tocButtonRoot: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  tocButtonGutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  levelOne: {
    fontSize: theme.typography.fontSize
  },
  levelTwo: {
    fontSize: theme.typography.fontSize,
    marginLeft: theme.spacing(1.5),
    '&::before': {
      content: '"- "'
    }
  }
}));

export interface TableOfContents {
  url: string;
  title: string;
  items?: TableOfContents[];
}

interface Props {
  level: number;
  items: TableOfContents[];
}

export const DrawerTOC = ({ items, level }: Props) => {
  const classes = useStyles();
  return (
    <List>
      {items &&
        items.map((item, i) => (
          <div key={i}>
            <Link to={item.url}>
              <ListItem button classes={{ root: classes.tocButtonRoot, gutters: classes.tocButtonGutters }}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    className: c({ [classes.levelOne]: level === 1, [classes.levelTwo]: level !== 1 })
                  }}
                >
                  {item.title}
                </ListItemText>
              </ListItem>
            </Link>
            {item.items &&
              item.items.map((tocObj, j) => (
                <DrawerTOC key={j} level={level + 1} items={tocObj.items || ([] as TableOfContents[])} />
              ))}
          </div>
        ))}
    </List>
  );
};
