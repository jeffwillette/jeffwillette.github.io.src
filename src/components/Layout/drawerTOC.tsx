import { createStyles, List, ListItem, ListItemText, Theme, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import React from 'react';
import { Link } from '../link';

const styles = (theme: Theme) =>
  createStyles({
    tocButtonRoot: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    tocButtonGutters: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    },
    levelOne: {
      fontSize: theme.typography.fontSize
    },
    levelTwo: {
      fontSize: theme.typography.fontSize - 3
    }
  });

export interface TableOfContents {
  url: string;
  title: string;
  items?: TableOfContents[];
}

interface Props extends WithStyles<typeof styles> {
  level: number;
  items: TableOfContents[];
}

const drawerTOC = ({ items, level, classes }: Props) => {
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
            {item.items && <DrawerTOC level={level + 1} items={item.items} classes={classes} />}
          </div>
        ))}
    </List>
  );
};

export const DrawerTOC = withStyles(styles)(drawerTOC);
