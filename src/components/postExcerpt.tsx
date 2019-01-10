import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { Moment } from 'moment';
import React from 'react';
import { Link } from './link';
import { TagChip } from './tagChip';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      margin: `${theme.spacing.unit * 2}px 0px`,
      borderLeft: `4px solid rgba(0,0,0,.1)`,
      backgroundColor: 'rgba(0,0,0,.01)'
    },
    subheaderSpan: {
      marginRight: theme.spacing.unit * 2
    },
    title: {
      fontSize: theme.typography.h2.fontSize
    }
  });

interface Props extends WithStyles<typeof styles> {
  title: string;
  createdAt: Moment;
  updatedAt: Moment;
  slug: string;
  categories: Array<string | null>;
  timeToRead: number;
  excerpt: string;
}

const postExcerpt = ({ classes, slug, title, createdAt, updatedAt, categories, timeToRead, excerpt }: Props) => {
  return (
    <Card elevation={0} classes={{ root: classes.card }}>
      <CardHeader
        titleTypographyProps={{ classes: { root: classes.title } }}
        title={<Link to={slug} children={title} />}
        action={
          <span>
            {categories.map((c, i) => {
              return c && <TagChip key={i} tag={c} />;
            })}
            <TagChip tag={`${timeToRead} minute read`} />
          </span>
        }
        subheader={
          <span>
            <span className={classes.subheaderSpan}>created: {createdAt.format('ll')}</span>
            <span className={classes.subheaderSpan}>updated: {updatedAt.format('ll')}</span>
          </span>
        }
      />
      <CardContent>
        <Typography variant="body2">{excerpt}</Typography>
      </CardContent>
    </Card>
  );
};

export const PostExcerpt = withStyles(styles)(postExcerpt);
