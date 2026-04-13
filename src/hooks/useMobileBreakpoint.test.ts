import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMobileBreakpoint } from './useMobileBreakpoint';

describe('useMobileBreakpoint', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock window.matchMedia
    mockMatchMedia = vi.fn();
    window.matchMedia = mockMatchMedia as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when viewport width is <= 768px', () => {
    const listeners: Array<(event: MediaQueryListEvent) => void> = [];

    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn((_event: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.push(listener);
      }),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useMobileBreakpoint());

    expect(result.current).toBe(true);
  });

  it('returns false when viewport width is > 768px', () => {
    const listeners: Array<(event: MediaQueryListEvent) => void> = [];

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn((_event: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.push(listener);
      }),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useMobileBreakpoint());

    expect(result.current).toBe(false);
  });

  it('falls back to addListener for older browsers', () => {
    const listeners: Array<(event: MediaQueryListEvent) => void> = [];

    mockMatchMedia.mockReturnValue({
      matches: false,
      addListener: vi.fn((listener: (event: MediaQueryListEvent) => void) => {
        listeners.push(listener);
      }),
      removeListener: vi.fn(),
    });

    const { result } = renderHook(() => useMobileBreakpoint());

    expect(result.current).toBe(false);
  });
});
