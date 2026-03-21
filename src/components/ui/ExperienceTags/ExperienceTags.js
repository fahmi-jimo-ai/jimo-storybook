import React from 'react';
import { Tag } from 'iconsax-react';
import './ExperienceTags.css';

const CYCLE_COLORS = ['blue', 'orange', 'purple'];

export const ExperienceTags = ({
  tags,
  maxVisible,
  className,
}) => {
  const visible = maxVisible !== undefined ? tags.slice(0, maxVisible) : tags;
  const overflowCount = maxVisible !== undefined ? Math.max(0, tags.length - maxVisible) : 0;

  const classes = ['experience-tags', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className="experience-tags__icon" aria-hidden="true">
        <Tag size={16} color="currentColor" />
      </span>
      <div className="experience-tags__pills">
        {visible.map((tag, i) => {
          const color = tag.color ?? CYCLE_COLORS[i % CYCLE_COLORS.length];
          return (
            <span key={i} className={`experience-tags__pill experience-tags__pill--${color}`}>
              {tag.label}
            </span>
          );
        })}
        {overflowCount > 0 && (
          <span className="experience-tags__pill experience-tags__pill--overflow">
            +{overflowCount}
          </span>
        )}
      </div>
    </div>
  );
};
