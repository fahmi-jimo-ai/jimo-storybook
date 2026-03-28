import React from 'react';
import avatar01 from './assets/avatar-01.svg';
import avatar02 from './assets/avatar-02.svg';
import avatar03 from './assets/avatar-03.svg';
import avatar04 from './assets/avatar-04.svg';
import avatar05 from './assets/avatar-05.svg';
import avatar06 from './assets/avatar-06.svg';
import avatar07 from './assets/avatar-07.svg';
import avatar08 from './assets/avatar-08.svg';
import './UserIcon.css';

const AVATARS = [avatar01, avatar02, avatar03, avatar04, avatar05, avatar06, avatar07, avatar08];

export const UserIcon = React.forwardRef(({ variant = 1, size = 24, className, style }, ref) => {
  const src = AVATARS[(variant - 1) % AVATARS.length];
  return (
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      className={['user-icon', className].filter(Boolean).join(' ')}
      style={{ width: Math.round(size * 17 / 20), height: size, ...style }}
    />
  );
});

UserIcon.displayName = 'UserIcon';
