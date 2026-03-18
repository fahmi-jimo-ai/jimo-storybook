import React from 'react';
import './ExperienceStatus.css';

export type ExperienceStatusValue = 'draft' | 'live' | 'paused' | 'expired';

export interface ExperienceStatusProps {
  status?: ExperienceStatusValue;
  className?: string;
}

export const ExperienceStatus: React.FC<ExperienceStatusProps> = ({
  status = 'live',
  className,
}) => {
  const label: Record<ExperienceStatusValue, string> = {
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
