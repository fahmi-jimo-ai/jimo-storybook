import React from 'react';
import { UserIcon } from '../UserIcon/UserIcon';
import './UserAvatar.css';

const COLOR_VARIANTS = ['blue', 'green', 'orange', 'yellow', 'purple', 'red'];

export const UserAvatar = React.forwardRef(
  ({ iconVariant = 1, colorVariant = 'blue', size = 20, className, style }, ref) => {
    const iconSize = Math.round(size * (13.33 / 20));
    return (
      <div
        ref={ref}
        className={['user-avatar', `user-avatar--${colorVariant}`, className].filter(Boolean).join(' ')}
        style={{ width: size, height: size, ...style }}
        aria-hidden="true"
      >
        <UserIcon variant={iconVariant} size={iconSize} />
      </div>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

/**
 * Given a string id, deterministically returns an iconVariant (1–9) and a
 * colorVariant name. Use these when you want consistent avatars per user.
 */
export function getAvatarProps(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff;
  const abs = Math.abs(hash);
  const iconVariant = (abs % 8) + 1;
  const colorVariant = COLOR_VARIANTS[Math.floor(abs / 9) % COLOR_VARIANTS.length];
  return { iconVariant, colorVariant };
}
