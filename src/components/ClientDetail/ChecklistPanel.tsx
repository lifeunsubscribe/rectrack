import { useState, useEffect } from 'react';
import type { ChecklistPeriod } from '../../types';
import ChecklistStep from './ChecklistStep';

interface ChecklistPanelProps {
  checklist: ChecklistPeriod | null;
  currentPeriod: string;
}

// Step definitions from ADR Section 4
const CHECKLIST_STEPS = [
  { number: 1, label: 'Bank statements received for all accounts' },
  { number: 2, label: 'All accounts reconciled as of close date' },
  { number: 3, label: 'All client notes resolved' },
  { number: 4, label: 'Jen review complete' },
  { number: 5, label: 'Financials sent to client' },
];

/**
 * ChecklistPanel - Current period checklist with 5 steps and toggle controls
 * Local state only (no persistence in demo)
 */
function ChecklistPanel({ checklist, currentPeriod }: ChecklistPanelProps) {
  // Initialize local state from checklist prop or defaults
  const [stepStates, setStepStates] = useState({
    step_1_complete: checklist?.step_1_complete ?? false,
    step_1_completed_by: checklist?.step_1_completed_by,
    step_1_completed_at: checklist?.step_1_completed_at,
    step_2_complete: checklist?.step_2_complete ?? false,
    step_2_completed_by: checklist?.step_2_completed_by,
    step_2_completed_at: checklist?.step_2_completed_at,
    step_3_complete: checklist?.step_3_complete ?? false,
    step_3_completed_by: checklist?.step_3_completed_by,
    step_3_completed_at: checklist?.step_3_completed_at,
    step_4_complete: checklist?.step_4_complete ?? false,
    step_4_completed_by: checklist?.step_4_completed_by,
    step_4_completed_at: checklist?.step_4_completed_at,
    step_5_complete: checklist?.step_5_complete ?? false,
    step_5_completed_by: checklist?.step_5_completed_by,
    step_5_completed_at: checklist?.step_5_completed_at,
  });

  // Sync local state when checklist prop changes
  useEffect(() => {
    if (checklist) {
      setStepStates({
        step_1_complete: checklist.step_1_complete,
        step_1_completed_by: checklist.step_1_completed_by,
        step_1_completed_at: checklist.step_1_completed_at,
        step_2_complete: checklist.step_2_complete,
        step_2_completed_by: checklist.step_2_completed_by,
        step_2_completed_at: checklist.step_2_completed_at,
        step_3_complete: checklist.step_3_complete,
        step_3_completed_by: checklist.step_3_completed_by,
        step_3_completed_at: checklist.step_3_completed_at,
        step_4_complete: checklist.step_4_complete,
        step_4_completed_by: checklist.step_4_completed_by,
        step_4_completed_at: checklist.step_4_completed_at,
        step_5_complete: checklist.step_5_complete,
        step_5_completed_by: checklist.step_5_completed_by,
        step_5_completed_at: checklist.step_5_completed_at,
      });
    }
  }, [checklist]);

  const handleToggle = (stepNumber: number) => {
    const stepKey = `step_${stepNumber}` as const;
    const isCurrentlyComplete = stepStates[`${stepKey}_complete` as keyof typeof stepStates] as boolean;

    // Toggle step completion (demo mode - no persistence)
    setStepStates((prev) => ({
      ...prev,
      [`${stepKey}_complete`]: !isCurrentlyComplete,
      // In a real app, would set completed_by to current user and completed_at to now
      [`${stepKey}_completed_by`]: !isCurrentlyComplete ? 'Demo User' : undefined,
      [`${stepKey}_completed_at`]: !isCurrentlyComplete ? new Date().toISOString() : undefined,
    }));
  };

  return (
    <div className="checklist-panel">
      <h3 className="checklist-panel__title">
        Checklist - {currentPeriod}
      </h3>
      <div className="checklist-panel__steps">
        {CHECKLIST_STEPS.map(({ number, label }) => {
          const stepKey = `step_${number}` as const;
          return (
            <ChecklistStep
              key={number}
              stepNumber={number}
              label={label}
              isComplete={stepStates[`${stepKey}_complete` as keyof typeof stepStates] as boolean}
              completedBy={stepStates[`${stepKey}_completed_by` as keyof typeof stepStates] as string | undefined}
              completedAt={stepStates[`${stepKey}_completed_at` as keyof typeof stepStates] as string | undefined}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChecklistPanel;
