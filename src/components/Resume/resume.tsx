import React from 'react';
import { AboutPage_site_siteMetadata_resume } from '../../gatsby-queries';
import { safe } from '../../utils';
import { Basics } from './basics';
import { Education } from './education';
import { Interests } from './interests';
import { Languages } from './languages';
import { Publications } from './publications';
import { References } from './references';
import { Skills } from './skills';
import { Work } from './work';

interface Props {
  resume: AboutPage_site_siteMetadata_resume;
  avatarSrc: string;
}

export const Resume = ({ resume, avatarSrc }: Props) => {
  const { basics, work, education, skills, interests, languages, references, publications } = safe(resume);
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Basics avatarSrc={avatarSrc} basics={safe(basics)} />
      <Work work={safe(work)} />
      <Education education={safe(education)} />
      {/*
          <Skills skills={safe(skills)} />
          <Interests interests={safe(interests)} />
          <Languages languages={safe(languages)} />
          <References references={safe(references)} />
          <Publications publications={safe(publications)} />
      */}
    </div>
  );
};
