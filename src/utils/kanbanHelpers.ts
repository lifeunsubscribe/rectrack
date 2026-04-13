import type { ClientWithMetadata } from '../hooks/useClientFilter';

/**
 * Step definitions matching ADR Section 4
 */
export const STEP_LABELS = [
  'Access confirmed',
  'Reconciled',
  'Questions resolved',
  'Jen review',
  'Sent to client',
] as const;

/**
 * Column configuration for kanban board
 */
export interface KanbanColumn {
  id: string;
  title: string;
  clients: ClientWithMetadata[];
}

/**
 * Group clients by their pipeline step for kanban display
 *
 * Logic:
 * - "Complete" column: all 5 steps done (pipelineStatus === 'green')
 * - Steps 1-5: clients with that step as lowest incomplete
 * - Grey status clients go to Step 1 (no checklist = start at beginning)
 *
 * @param clients - Enriched client data with metadata
 * @returns Array of 6 columns (Steps 1-5 + Complete)
 */
export function groupClientsByStep(clients: ClientWithMetadata[]): KanbanColumn[] {
  const columns: KanbanColumn[] = [
    { id: 'step-1', title: '1. Access confirmed', clients: [] },
    { id: 'step-2', title: '2. Reconciled', clients: [] },
    { id: 'step-3', title: '3. Questions resolved', clients: [] },
    { id: 'step-4', title: '4. Jen review', clients: [] },
    { id: 'step-5', title: '5. Sent to client', clients: [] },
    { id: 'complete', title: 'Complete', clients: [] },
  ];

  clients.forEach((clientData) => {
    const { pipelineStatus, currentStep } = clientData;

    // Complete column: all steps done
    if (pipelineStatus === 'green') {
      columns[5].clients.push(clientData);
      return;
    }

    // Grey status (no checklist) goes to Step 1
    // Per ADR: grey means no checklist period exists, so client starts at the beginning
    if (pipelineStatus === 'grey') {
      columns[0].clients.push(clientData);
      return;
    }

    // Place in column based on lowest incomplete step
    // currentStep is the count of completed steps (0-4 means incomplete, 5 would be complete/green)
    // Example mapping:
    //   currentStep = 0 → step 1 incomplete → column[0] (Step 1)
    //   currentStep = 1 → step 2 incomplete → column[1] (Step 2)
    //   currentStep = 2 → step 3 incomplete → column[2] (Step 3)
    //   currentStep = 3 → step 4 incomplete → column[3] (Step 4)
    //   currentStep = 4 → step 5 incomplete → column[4] (Step 5)
    const columnIndex = Math.min(currentStep, 4); // Cap at 4 to prevent index out of bounds
    columns[columnIndex].clients.push(clientData);
  });

  return columns;
}
