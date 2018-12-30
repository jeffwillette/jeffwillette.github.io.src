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
    }
  });

interface Props extends WithStyles<typeof styles> {
  title: string;
  created: Moment;
  edited: Moment;
  slug: string;
  categories: Array<string | null>;
  timeToRead: number;
  excerpt: string;
}

const postExcerpt = ({ classes, slug, title, created, edited, categories, timeToRead, excerpt }: Props) => {
  return (
    <Card elevation={0} classes={{ root: classes.card }}>
      <CardHeader
        title={<Link to={slug} children={title} />}
        action={
          <span>
            {categories.map(c => {
              return c && <TagChip tag={c} />;
            })}
            <TagChip tag={`${timeToRead} minute read`} />
          </span>
        }
        subheader={
          <Typography variant="subtitle2">
            <span className={classes.subheaderSpan}>created: {created.format('LLL')}</span>
            <span className={classes.subheaderSpan}>edited: {edited.format('LLL')}</span>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2">{excerpt}</Typography>
      </CardContent>
    </Card>
  );
};

export const PostExcerpt = withStyles(styles)(postExcerpt);
