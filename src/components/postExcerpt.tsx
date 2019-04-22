import { Card, CardContent, CardHeader, makeStyles, Theme, Typography } from '@material-ui/core';
import { Moment } from 'moment';
import React from 'react';
import { Link } from './link';
import { TagChip } from './tagChip';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: `${theme.spacing(2)}px 0px`,
    borderLeft: `4px solid rgba(0,0,0,.2)`,
    backgroundColor: 'rgba(0,0,0,.05)'
  },
  subheaderSpan: {
    marginRight: theme.spacing(2)
  },
  title: {
    fontSize: theme.typography.h2.fontSize
  },
  mobileCategories: {
    display: 'block'
  }
}));

interface Props {
  title: string;
  createdAt: Moment;
  updatedAt: Moment;
  slug: string;
  categories: Array<string | null>;
  timeToRead: number;
  excerpt: string;
}

export const PostExcerpt = ({ slug, title, createdAt, updatedAt, categories, timeToRead, excerpt }: Props) => {
  const classes = useStyles();
  const cats = (
    <span>
      {categories.map((c, i) => {
        return c && <TagChip key={i} tag={c} />;
      })}
      <TagChip tag={`${timeToRead} minute read`} />
    </span>
  );

  return (
    <Card elevation={0} classes={{ root: classes.card }}>
      <CardHeader
        titleTypographyProps={{ classes: { root: classes.title } }}
        title={<Link to={slug} children={title} />}
        subheader={
          <span>
            <span className={classes.subheaderSpan}>created: {createdAt.format('ll')}</span>
            <span className={classes.subheaderSpan}>updated: {updatedAt.format('ll')}</span>
          </span>
        }
      />
      <CardContent>
        <span className={classes.mobileCategories} children={cats} />
        <Typography variant="body2">{excerpt}</Typography>
      </CardContent>
    </Card>
  );
};
