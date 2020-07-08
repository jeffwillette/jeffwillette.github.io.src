import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { useStyles } from './styles';
import { List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import { TagChip } from '../../components/tagChip';

interface Props {
  education: AboutPage_site_siteMetadata_resume['education'];
}

export const Education = ({ education }: Props) => {
  const classes = useStyles();
  return (
    education && (
      <div>
        <List>
          <Typography className={classes.heading} variant="h2">
            Education
          </Typography>
          {education.map((edu, i) => {
            return (
              <React.Fragment>
                <ListItem key={i} classes={{ root: classes.list }}>
                  <ListItemText
                    primary={`${edu.institution}`}
                    secondary={
                      <React.Fragment>
                        <div>{`${edu.studyType} - ${edu.area} (${edu.startDate} - ${edu.endDate})`}</div>
                        <div className={classes.tags}>
                          {edu.courses.map((course, i) => (
                            <TagChip key={i} tag={course} />
                          ))}
                        </div>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {i !== education.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </div>
    )
  );
};
