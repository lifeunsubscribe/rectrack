import { describe, it, expect } from 'vitest';
import { groupClientsByStep } from './kanbanHelpers';
import type { ClientWithMetadata } from '../hooks/useClientFilter';

describe('kanbanHelpers', () => {
  describe('groupClientsByStep', () => {
    it('groups complete clients (green status) in Complete column', () => {
      const clients: ClientWithMetadata[] = [
        {
          client: { id: 'c1', name: 'Client 1', archived: false },
          pipelineStatus: 'green',
          currentStep: 5,
          openQuestionCount: 0,
          schedule: undefined,
        },
      ];

      const columns = groupClientsByStep(clients);
      const completeColumn = columns.find((col) => col.id === 'complete');

      expect(completeColumn).toBeDefined();
      expect(completeColumn?.clients).toHaveLength(1);
      expect(completeColumn?.clients[0].client.id).toBe('c1');
    });

    it('groups grey status clients in Step 1 column', () => {
      const clients: ClientWithMetadata[] = [
        {
          client: { id: 'c2', name: 'Client 2', archived: false },
          pipelineStatus: 'grey',
          currentStep: 0,
          openQuestionCount: 0,
          schedule: undefined,
        },
      ];

      const columns = groupClientsByStep(clients);
      const step1Column = columns.find((col) => col.id === 'step-1');

      expect(step1Column).toBeDefined();
      expect(step1Column?.clients).toHaveLength(1);
      expect(step1Column?.clients[0].client.id).toBe('c2');
    });

    it('groups clients by lowest incomplete step', () => {
      const clients: ClientWithMetadata[] = [
        {
          client: { id: 'c3', name: 'Client 3', archived: false },
          pipelineStatus: 'blue',
          currentStep: 0,
          openQuestionCount: 0,
          schedule: undefined,
        },
        {
          client: { id: 'c4', name: 'Client 4', archived: false },
          pipelineStatus: 'yellow',
          currentStep: 2,
          openQuestionCount: 1,
          schedule: undefined,
        },
        {
          client: { id: 'c5', name: 'Client 5', archived: false },
          pipelineStatus: 'red',
          currentStep: 4,
          openQuestionCount: 0,
          schedule: undefined,
        },
      ];

      const columns = groupClientsByStep(clients);

      // Client 3: 0 steps complete -> Step 1 (index 0)
      expect(columns[0].clients[0].client.id).toBe('c3');

      // Client 4: 2 steps complete -> Step 3 (index 2)
      expect(columns[2].clients[0].client.id).toBe('c4');

      // Client 5: 4 steps complete -> Step 5 (index 4)
      expect(columns[4].clients[0].client.id).toBe('c5');
    });

    it('returns 6 columns with correct structure', () => {
      const columns = groupClientsByStep([]);

      expect(columns).toHaveLength(6);
      expect(columns[0].id).toBe('step-1');
      expect(columns[0].title).toBe('1. Access confirmed');
      expect(columns[1].id).toBe('step-2');
      expect(columns[1].title).toBe('2. Reconciled');
      expect(columns[2].id).toBe('step-3');
      expect(columns[2].title).toBe('3. Questions resolved');
      expect(columns[3].id).toBe('step-4');
      expect(columns[3].title).toBe('4. Jen review');
      expect(columns[4].id).toBe('step-5');
      expect(columns[4].title).toBe('5. Sent to client');
      expect(columns[5].id).toBe('complete');
      expect(columns[5].title).toBe('Complete');
    });

    it('handles empty client list', () => {
      const columns = groupClientsByStep([]);

      expect(columns).toHaveLength(6);
      columns.forEach((column) => {
        expect(column.clients).toHaveLength(0);
      });
    });
  });
});
