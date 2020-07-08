import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { useStyles } from './styles';
import { List, ListItem, Divider, ListItemText, Typography } from '@material-ui/core';
import { TagChip } from '../../components/tagChip';

interface Props {
  work: AboutPage_site_siteMetadata_resume['work'];
}

export const Work = ({ work }: Props) => {
  const classes = useStyles();
  return (
    work && (
      <div>
        <List>
          <Typography className={classes.heading} variant="h2">
            Work
          </Typography>
          {work.map((item, i) => {
            return (
              <React.Fragment>
                <ListItem key={i} classes={{ root: classes.list }}>
                  <ListItemText
                    primary={`${item.company} (${item.startDate} - ${item.endDate})`}
                    secondary={
                      <React.Fragment>
                        <div>{`${item.position} - ${item.summary}`}</div>
                        <div className={classes.tags}>
                          {item.highlights.map((h, i) => (
                            <TagChip key={i} tag={h} />
                          ))}
                        </div>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {i !== work.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </div>
    )
  );
};
