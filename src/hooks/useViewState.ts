import { useState } from 'react';

export type View = 'dashboard' | 'kanban' | 'client-detail' | 'account-detail';
export type MainView = 'dashboard' | 'kanban';

interface ViewState {
  currentView: View;
  selectedClientId: string | null;
  selectedAccountId: string | null;
  previousMainView: MainView;
}

interface ViewStateActions {
  navigateToDashboard: () => void;
  navigateToKanban: () => void;
  navigateToClient: (clientId: string) => void;
  navigateToAccount: (accountId: string) => void;
  navigateBack: () => void;
}

/**
 * Custom hook for managing view state and navigation
 * Tracks current view, selected entities, and previous main view for back navigation
 */
export function useViewState(initialView: View = 'dashboard'): ViewState & ViewStateActions {
  const [currentView, setCurrentView] = useState<View>(initialView);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  // Track which main view (dashboard/kanban) user was on before navigating to detail views
  const [previousMainView, setPreviousMainView] = useState<MainView>('dashboard');

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedClientId(null);
    setSelectedAccountId(null);
    setPreviousMainView('dashboard');
  };

  const navigateToKanban = () => {
    setCurrentView('kanban');
    setSelectedClientId(null);
    setSelectedAccountId(null);
    setPreviousMainView('kanban');
  };

  const navigateToClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setSelectedAccountId(null);
    setCurrentView('client-detail');
    // Don't update previousMainView - preserve it for back navigation
  };

  const navigateToAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    setCurrentView('account-detail');
    // Don't update previousMainView - preserve it for back navigation
  };

  // Navigate back from account detail to the previous main view
  const navigateBack = () => {
    setSelectedClientId(null);
    setSelectedAccountId(null);
    setCurrentView(previousMainView);
  };

  return {
    currentView,
    selectedClientId,
    selectedAccountId,
    previousMainView,
    navigateToDashboard,
    navigateToKanban,
    navigateToClient,
    navigateToAccount,
    navigateBack,
  };
}
