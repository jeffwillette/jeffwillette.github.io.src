import React from 'react';
import { Link } from '../link';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { faGithub, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from './styles';

interface Props {
  basics: AboutPage_site_siteMetadata_resume['basics'];
  avatarSrc: string;
}

const networks: Record<string, IconDefinition> = { GitHub: faGithub, Twitter: faTwitter };

export const Basics = ({ basics, avatarSrc }: Props) => {
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
