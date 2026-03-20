import React from 'react';
import { Profile2User, Global } from 'iconsax-react';
import { ExperienceStatus } from '../ExperienceStatus/ExperienceStatus';
import { ExperienceTags } from '../ExperienceTags/ExperienceTags';
import '../ExperienceStatus/ExperienceStatus.css';
import '../ExperienceTags/ExperienceTags.css';
import './ExperienceCard.css';

export const ExperienceCard = ({
  title,
  createdAt,
  status = 'live',
  tags = [],
  targeting = 'All users',
  environment = 'All Environments',
  layout = 'grid',
  thumbnailContent,
  hover = false,
  className,
}) => {
  const classes = [
    'experience-card',
    `experience-card--${layout}`,
    hover ? 'experience-card--hover' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const thumbnail = (
    <div className="experience-card__thumbnail">
      <div className="experience-card__thumbnail-inner">
        {thumbnailContent ?? (
          <div className="experience-card__thumbnail-placeholder" aria-hidden="true" />
        )}
      </div>
      <span className="experience-card__status-badge">
        <ExperienceStatus status={status} />
      </span>
    </div>
  );

  const targetingChip = (
    <div className="experience-card__chip">
      <Profile2User size={20} color="currentColor" />
      <span>{targeting}</span>
    </div>
  );

  const environmentChip = (
    <div className="experience-card__chip">
      <Global size={20} color="currentColor" />
      <span>{environment}</span>
    </div>
  );

  if (layout === 'grid') {
    return (
      <div className={classes}>
        {thumbnail}
        {tags.length > 0 && <ExperienceTags tags={tags} maxVisible={3} />}
        <div className="experience-card__body">
          <div className="experience-card__meta">
            <span className="experience-card__title">{title}</span>
            <span className="experience-card__date">{createdAt}</span>
          </div>
          <div className="experience-card__chips">
            {targetingChip}
            {environmentChip}
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'line') {
    return (
      <div className={classes}>
        {thumbnail}
        <div className="experience-card__body">
          <div className="experience-card__texts">
            <span className="experience-card__title">{title}</span>
            <span className="experience-card__date">{createdAt}</span>
          </div>
          {tags.length > 0 && <ExperienceTags tags={tags} maxVisible={3} />}
        </div>
        <div className="experience-card__chips experience-card__chips--row">
          {targetingChip}
          {environmentChip}
        </div>
      </div>
    );
  }

  // compact
  return (
    <div className={classes}>
      <ExperienceStatus status={status} />
      <span className="experience-card__title">{title}</span>
      {tags.length > 0 && <ExperienceTags tags={tags} maxVisible={2} />}
      <div className="experience-card__chips experience-card__chips--row">
        {targetingChip}
        {environmentChip}
      </div>
      <span className="experience-card__date">{createdAt}</span>
    </div>
  );
};
