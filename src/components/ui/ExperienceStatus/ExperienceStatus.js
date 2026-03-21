import React from 'react';
import './ExperienceStatus.css';

export const ExperienceStatus = ({
  status = 'live',
  className,
}) => {
  const label = {
    live: 'Live',
    draft: 'Draft',
    paused: 'Paused',
    expired: 'Expired',
  };

  const classes = [
    'experience-status',
    `experience-status--${status}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label[status]}</span>;
};
