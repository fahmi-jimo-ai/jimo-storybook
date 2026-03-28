import React, { useRef, useEffect, useState } from 'react';
import './Tooltip.css';

export const Tooltip = ({
  children,
  className,
}) => {
  const ghostRef = useRef(null);
  const bubbleRef = useRef(null);
  const [bubbleWidth, setBubbleWidth] = useState(null);

  useEffect(() => {
    if (!ghostRef.current || !bubbleRef.current) return;

    const singleLineWidth = ghostRef.current.scrollWidth;
    const bubble = bubbleRef.current;
    const style = getComputedStyle(bubble);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const twoLineHeight = Math.ceil(2 * lineHeight + paddingTop + paddingBottom);

    // Binary search: find the minimum width that renders in ≤ 2 lines
    let lo = Math.ceil(singleLineWidth / 2);
    let hi = singleLineWidth;

    bubble.style.width = lo + 'px';
    if (bubble.scrollHeight <= twoLineHeight) {
      bubble.style.width = '';
      setBubbleWidth(lo);
      return;
    }

    while (hi - lo > 1) {
      const mid = Math.floor((lo + hi) / 2);
      bubble.style.width = mid + 'px';
      if (bubble.scrollHeight <= twoLineHeight) {
        hi = mid;
      } else {
        lo = mid;
      }
    }

    bubble.style.width = '';
    setBubbleWidth(hi);
  }, [children]);

  const classes = ['tooltip', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span ref={ghostRef} className="tooltip__ghost">{children}</span>
      <div
        ref={bubbleRef}
        className="tooltip__bubble"
        style={bubbleWidth ? { width: bubbleWidth } : undefined}
      >
        {children}
      </div>
    </div>
  );
};
