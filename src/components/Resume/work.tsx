import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { useStyles } from './styles';

interface Props {
  work: AboutPage_site_siteMetadata_resume['work'];
}

export const Work = ({ work }: Props) => {
  const classes = useStyles();
  return (
    basics && (
      <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={avatarSrc || undefined} classes={{ root: classes.avatar }} />
            </ListItemAvatar>
              <ListItemText
              primary={
                <span className={classes.name}>
                  {basics.name}
                  {basics.profiles &&
                    basics.profiles.map((profile, i) => {
                    return (
                      profile &&
                        profile.network && (
                          <Link key={i} to={profile.url || ''} white>
                          <FontAwesomeIcon className={classes.icon} icon={networks[profile.network]} />
                          </Link>
                            )
                    );
                  })}
                  </span>
              }
              secondary={<span className={classes.secondary}>{basics.summary}</span>}
              />
              </ListItem>
                </List>
                  </div>
                    )
  );
};
