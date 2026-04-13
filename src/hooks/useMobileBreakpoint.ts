/**
 * useMobileBreakpoint hook
 * Detects viewport width and returns whether mobile layout should be active
 * Breakpoint: 768px (mobile when <= 768px)
 */

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useMobileBreakpoint(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    // Use matchMedia for efficient breakpoint detection
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return isMobile;
}
