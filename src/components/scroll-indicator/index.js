import React, { useEffect, useRef } from 'react';
import onScroll from '#/common/scroller';
import './style.css';

export default function ScrollIndicator() {
  const ref = useRef();
  useEffect(() => {
    const listener = () => {
      const docEl = document.documentElement;
      const scrollTop = document.body.scrollTop || docEl.scrollTop;
      const height = docEl.scrollHeight - docEl.clientHeight;
      const scrolled = scrollTop / height;
      ref.current.style.transform = `scaleX(${scrolled})`;
    };
    return onScroll(listener);
  });
  return (
    <div className="scroll-indicator">
      <div ref={ref} />
    </div>
  );
}
