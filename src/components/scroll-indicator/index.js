import React, { useEffect, useRef } from 'react';
import onScroll from '@/common/scroller';

export default function ScrollIndicator() {
  const ref = useRef();
  useEffect(() => {
    const listener = () => {
      const docEl = document.documentElement;
      const scrollTop = document.body.scrollTop || docEl.scrollTop;
      const height = docEl.scrollHeight - docEl.clientHeight;
      const scrolled = scrollTop / height;
      const scaleX = Math.min(1, scrolled);
      ref.current.style.transform = `scaleX(${scaleX})`;
    };
    return onScroll(listener);
  });
  return (
    <div className="w-full h-px">
      <div
        className="w-full h-full origin-left bg-yellow-500 scale-x-0"
        ref={ref}
      />
    </div>
  );
}
