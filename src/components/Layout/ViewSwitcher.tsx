import type { MainView } from '../../hooks/useViewState';
import '../../styles/topbar.css';

interface ViewSwitcherProps {
  currentView: MainView;
  onViewChange: (view: MainView) => void;
}

/**
 * ViewSwitcher - Toggle between Dashboard and Kanban views
 * Displayed in the TopBar to allow switching between main application views
 */
function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="view-switcher" role="group" aria-label="View switcher">
      <button
        type="button"
        className={`view-switcher__button ${
          currentView === 'dashboard' ? 'view-switcher__button--active' : ''
        }`}
        onClick={() => onViewChange('dashboard')}
        aria-pressed={currentView === 'dashboard'}
      >
        Dashboard
      </button>
      <button
        type="button"
        className={`view-switcher__button ${
          currentView === 'kanban' ? 'view-switcher__button--active' : ''
        }`}
        onClick={() => onViewChange('kanban')}
        aria-pressed={currentView === 'kanban'}
      >
        Kanban
      </button>
    </div>
  );
}

export default ViewSwitcher;
