import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useViewState } from './useViewState';

describe('useViewState', () => {
  it('initializes with default dashboard view', () => {
    const { result } = renderHook(() => useViewState());

    expect(result.current.currentView).toBe('dashboard');
    expect(result.current.selectedClientId).toBe(null);
    expect(result.current.selectedAccountId).toBe(null);
    expect(result.current.previousMainView).toBe('dashboard');
  });

  it('initializes with custom initial view', () => {
    const { result } = renderHook(() => useViewState('kanban'));

    expect(result.current.currentView).toBe('kanban');
  });

  it('navigates to dashboard and clears selections', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToClient('client-1');
    });

    expect(result.current.currentView).toBe('client-detail');
    expect(result.current.selectedClientId).toBe('client-1');

    act(() => {
      result.current.navigateToDashboard();
    });

    expect(result.current.currentView).toBe('dashboard');
    expect(result.current.selectedClientId).toBe(null);
    expect(result.current.selectedAccountId).toBe(null);
    expect(result.current.previousMainView).toBe('dashboard');
  });

  it('navigates to kanban and clears selections', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToClient('client-1');
    });

    act(() => {
      result.current.navigateToKanban();
    });

    expect(result.current.currentView).toBe('kanban');
    expect(result.current.selectedClientId).toBe(null);
    expect(result.current.selectedAccountId).toBe(null);
    expect(result.current.previousMainView).toBe('kanban');
  });

  it('navigates to client detail', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToClient('client-123');
    });

    expect(result.current.currentView).toBe('client-detail');
    expect(result.current.selectedClientId).toBe('client-123');
    expect(result.current.selectedAccountId).toBe(null);
  });

  it('navigates to account detail', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToAccount('account-456');
    });

    expect(result.current.currentView).toBe('account-detail');
    expect(result.current.selectedAccountId).toBe('account-456');
  });

  it('preserves previousMainView when navigating to client detail', () => {
    const { result } = renderHook(() => useViewState('kanban'));

    expect(result.current.previousMainView).toBe('dashboard');

    act(() => {
      result.current.navigateToKanban();
    });

    expect(result.current.previousMainView).toBe('kanban');

    act(() => {
      result.current.navigateToClient('client-1');
    });

    expect(result.current.currentView).toBe('client-detail');
    expect(result.current.previousMainView).toBe('kanban');
  });

  it('preserves previousMainView when navigating to account detail', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToDashboard();
    });

    expect(result.current.previousMainView).toBe('dashboard');

    act(() => {
      result.current.navigateToAccount('account-1');
    });

    expect(result.current.currentView).toBe('account-detail');
    expect(result.current.previousMainView).toBe('dashboard');
  });

  it('navigates back from account detail to previous main view', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToKanban();
    });

    expect(result.current.previousMainView).toBe('kanban');

    act(() => {
      result.current.navigateToAccount('account-1');
    });

    expect(result.current.currentView).toBe('account-detail');

    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.currentView).toBe('kanban');
    expect(result.current.selectedAccountId).toBe(null);
  });

  it('navigateBack clears both client and account selection', () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.navigateToDashboard();
      result.current.navigateToClient('client-1');
      result.current.navigateToAccount('account-1');
    });

    expect(result.current.selectedClientId).toBe('client-1');
    expect(result.current.selectedAccountId).toBe('account-1');

    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.selectedClientId).toBe(null);
    expect(result.current.selectedAccountId).toBe(null);
    expect(result.current.currentView).toBe('dashboard');
  });

  it('navigates kanban → client detail → back to kanban', () => {
    const { result } = renderHook(() => useViewState());

    // Start from kanban view
    act(() => {
      result.current.navigateToKanban();
    });

    expect(result.current.currentView).toBe('kanban');
    expect(result.current.previousMainView).toBe('kanban');
    expect(result.current.selectedClientId).toBe(null);

    // Navigate to client detail
    act(() => {
      result.current.navigateToClient('client-123');
    });

    expect(result.current.currentView).toBe('client-detail');
    expect(result.current.selectedClientId).toBe('client-123');
    expect(result.current.previousMainView).toBe('kanban');

    // Navigate back should return to kanban and clear client selection
    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.currentView).toBe('kanban');
    expect(result.current.selectedClientId).toBe(null);
    expect(result.current.previousMainView).toBe('kanban');
  });
});
