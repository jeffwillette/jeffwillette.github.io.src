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
    fontSize: theme.typography.fontSize - 3
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
                    variant: 'subtitle2',
                    className: c({ [classes.levelOne]: level === 1, [classes.levelTwo]: level !== 1 })
                  }}
                >
                  {item.title}
                </ListItemText>
              </ListItem>
            </Link>
            {item.items && <DrawerTOC level={level + 1} items={item.items} />}
          </div>
        ))}
    </List>
  );
};
