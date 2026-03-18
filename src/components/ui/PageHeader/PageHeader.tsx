import React from 'react';
import { Button, ButtonLevel } from '../Button/Button';
import '../Button/Button.css';
import {
  PrimaryHorizontalMenuGroup,
  PrimaryHorizontalMenuTab,
} from '../PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup';
import '../PrimaryHorizontalMenuGroup/PrimaryHorizontalMenuGroup.css';
import '../PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';
import './PageHeader.css';

export type PageHeaderType = 'main' | 'sub';

export interface PageHeaderButton {
  label: string;
  level?: ButtonLevel;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page layout type — main page has large title; sub page has a back button + smaller title */
  type?: PageHeaderType;
  /** Page title text */
  title?: string;
  /** Show the button group on the right */
  showButtonGroup?: boolean;
  /** Size applied to all buttons in the button group */
  buttonSize?: 'big' | 'small';
  /** Show the tab bar below the title row */
  showTabs?: boolean;
  /** Buttons rendered in the button group */
  buttons?: PageHeaderButton[];
  /** Tab definitions passed to PrimaryHorizontalMenuGroup */
  tabs?: PrimaryHorizontalMenuTab[];
  /** ID of the currently active tab */
  activeTab?: string;
  /** Called when a tab is clicked */
  onTabClick?: (id: string) => void;
  /** Called when the back button is clicked (sub page only) */
  onBackClick?: () => void;
  /** Back button icon (sub page only) — defaults to ArrowLeft2 from iconsax */
  backIcon?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
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
