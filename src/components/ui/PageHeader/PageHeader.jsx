import React from 'react';
import { Button } from '../Button/Button';
import '../Button/Button.css';
import { PrimaryHorizontalMenuGroup } from '../PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup';
import '../PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.css';
import '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';
import './PageHeader.css';

export const PageHeader = React.forwardRef(
  (
    {
      type = 'main',
      title = 'Page Title',
      showButtonGroup = true,
      buttonSize = 'big',
      showTabs = true,
      buttons = [],
      tabs = [],
      activeTab,
      onTabClick,
      onBackClick,
      backIcon,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'page-header',
      type === 'sub' ? 'page-header--sub' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const buttonGroup = showButtonGroup && buttons.length > 0 && (
      <div className="page-header__button-group">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            level={btn.level ?? 'secondary'}
            size={buttonSize}
            leftIcon={btn.leftIcon}
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    );

    return (
      <div ref={ref} className={classes} {...rest}>
        {/* ── Title row ── */}
        <div className="page-header__top">
          {type === 'main' ? (
            <h1 className="page-header__title">{title}</h1>
          ) : (
            <div className="page-header__title-group">
              <Button
                level="secondary"
                size="small"
                iconOnly
                leftIcon={backIcon}
                onClick={onBackClick}
                aria-label="Go back"
              />
              <h2 className="page-header__title page-header__title--sub">{title}</h2>
            </div>
          )}
          {buttonGroup}
        </div>

        {/* ── Tab bar ── */}
        {showTabs && tabs.length > 0 && (
          <PrimaryHorizontalMenuGroup
            tabs={tabs}
            activeItem={activeTab}
            onTabClick={onTabClick}
          />
        )}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
