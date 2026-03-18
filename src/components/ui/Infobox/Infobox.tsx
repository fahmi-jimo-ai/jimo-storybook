import React from 'react';
import { TickCircle, Warning2, CloseCircle, InfoCircle } from 'iconsax-react';
import './Infobox.css';

export type InfoboxType = 'neutral' | 'positive' | 'warning' | 'danger' | 'brand';

export interface InfoboxProps {
  /** Semantic type */
  type?: InfoboxType;
  /** Title text */
  title: string;
  /** Optional body text */
  body?: string;
  /** Show the left icon */
  showIcon?: boolean;
  /** Override the default icon — accepts any iconsax-react or CustomIconComponent */
  icon?: React.ReactNode;
  /** CTA link/button label */
  ctaLabel?: string;
  /** Called when CTA is clicked */
  onCta?: () => void;
  className?: string;
}

/** Filled iconsax icons for each infobox type — color is driven by CSS via currentColor */
const DefaultIcon: React.FC<{ type: InfoboxType }> = ({ type }) => {
  switch (type) {
    case 'positive':
      return <TickCircle size={24} variant="Bold" color="currentColor" />;
    case 'warning':
      return <Warning2 size={24} variant="Bold" color="currentColor" />;
    case 'danger':
      return <CloseCircle size={24} variant="Bold" color="currentColor" />;
    case 'brand':
    case 'neutral':
    default:
      return <InfoCircle size={24} variant="Bold" color="currentColor" />;
  }
};

export const Infobox: React.FC<InfoboxProps> = ({
  type = 'neutral',
  title,
  body,
  showIcon = true,
  icon,
  ctaLabel,
  onCta,
  className,
}) => {
  const classes = ['infobox', `infobox--${type}`, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {showIcon && (
        <span className="infobox__icon" aria-hidden="true">
          {icon ?? <DefaultIcon type={type} />}
        </span>
      )}
      <div className="infobox__content">
        <div className="infobox__text-block">
          <p className="infobox__title">{title}</p>
          {body && <p className="infobox__body">{body}</p>}
        </div>
        {ctaLabel && onCta && (
          <button type="button" className="infobox__cta" onClick={onCta}>
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

Infobox.displayName = 'Infobox';
