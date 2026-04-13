import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPipelineStatus, STATUS_COLORS } from './pipelineStatus';
import type { ChecklistPeriod } from '../types';

describe('pipelineStatus', () => {
  describe('STATUS_COLORS', () => {
    it('defines all required status colors', () => {
      expect(STATUS_COLORS.grey).toBe('#9CA3AF');
      expect(STATUS_COLORS.green).toBe('#10B981');
      expect(STATUS_COLORS.blue).toBe('#3B82F6');
      expect(STATUS_COLORS.yellow).toBe('#F59E0B');
      expect(STATUS_COLORS.red).toBe('#EF4444');
    });
  });

  describe('getPipelineStatus', () => {
    let mockDate: Date;

    beforeEach(() => {
      // Mock current date to 2026-04-15 00:00:00 UTC
      mockDate = new Date('2026-04-15T00:00:00Z');
      vi.setSystemTime(mockDate);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('grey status (no checklist period)', () => {
      it('returns grey when checklist period is undefined', () => {
        const status = getPipelineStatus(undefined, '2026-04-20');
        expect(status).toBe('grey');
      });

      it('returns grey even when close date is past', () => {
        const status = getPipelineStatus(undefined, '2026-04-10');
        expect(status).toBe('grey');
      });
    });

    describe('green status (all steps complete)', () => {
      const completeChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: true,
        step_2_complete: true,
        step_3_complete: true,
        step_4_complete: true,
        step_5_complete: true,
      };

      it('returns green when all steps are complete', () => {
        const status = getPipelineStatus(completeChecklist, '2026-04-20');
        expect(status).toBe('green');
      });

      it('returns green even when close date is past', () => {
        const status = getPipelineStatus(completeChecklist, '2026-04-10');
        expect(status).toBe('green');
      });

      it('returns green even when within warning window', () => {
        const status = getPipelineStatus(completeChecklist, '2026-04-16', 7);
        expect(status).toBe('green');
      });
    });

    describe('red status (overdue)', () => {
      const incompleteChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: true,
        step_2_complete: true,
        step_3_complete: false,
        step_4_complete: false,
        step_5_complete: false,
      };

      it('returns red when close date has passed', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-14');
        expect(status).toBe('red');
      });

      it('returns red when close date is yesterday', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-14');
        expect(status).toBe('red');
      });

      it('returns red when close date is 1 week past', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-08');
        expect(status).toBe('red');
      });
    });

    describe('yellow status (warning window)', () => {
      const incompleteChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: true,
        step_2_complete: false,
        step_3_complete: false,
        step_4_complete: false,
        step_5_complete: false,
      };

      it('returns yellow when within default 7-day warning window', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-20', 7);
        expect(status).toBe('yellow');
      });

      it('returns yellow when close date is today', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-15', 7);
        expect(status).toBe('yellow');
      });

      it('returns yellow when 1 day until close date', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-16', 7);
        expect(status).toBe('yellow');
      });

      it('returns yellow on last day of warning window', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-22', 7);
        expect(status).toBe('yellow');
      });

      it('respects custom warning window', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-17', 2);
        expect(status).toBe('yellow');
      });

      it('handles zero warning days', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-15', 0);
        expect(status).toBe('yellow');
      });
    });

    describe('blue status (in progress)', () => {
      const incompleteChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: true,
        step_2_complete: true,
        step_3_complete: false,
        step_4_complete: false,
        step_5_complete: false,
      };

      it('returns blue when outside warning window', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-30', 7);
        expect(status).toBe('blue');
      });

      it('returns blue when no close date is set', () => {
        const status = getPipelineStatus(incompleteChecklist, undefined, 7);
        expect(status).toBe('blue');
      });

      it('returns blue when 8 days until close with 7-day warning', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-23', 7);
        expect(status).toBe('blue');
      });
    });

    describe('date calculation edge cases (timezone consistency)', () => {
      const incompleteChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: false,
        step_2_complete: false,
        step_3_complete: false,
        step_4_complete: false,
        step_5_complete: false,
      };

      it('uses UTC consistently regardless of local timezone', () => {
        // Mock time to 11:00 PM PST (7:00 AM UTC next day)
        vi.setSystemTime(new Date('2026-04-15T23:00:00-07:00'));

        // Close date is 2026-04-16 in UTC
        // Today in UTC is still 2026-04-16 (7:00 AM UTC)
        const status = getPipelineStatus(incompleteChecklist, '2026-04-16', 7);

        // Should be yellow (0 days until close), not red (overdue)
        expect(status).toBe('yellow');
      });

      it('handles midnight boundaries in UTC', () => {
        // Set to exactly midnight UTC
        vi.setSystemTime(new Date('2026-04-15T00:00:00Z'));

        const status = getPipelineStatus(incompleteChecklist, '2026-04-15', 7);
        expect(status).toBe('yellow'); // Today is the close date
      });

      it('handles date strings without time component', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-20', 7);
        expect(status).toBe('yellow'); // 5 days until close
      });

      it('handles invalid date strings', () => {
        const status = getPipelineStatus(incompleteChecklist, 'invalid-date', 7);
        expect(status).toBe('blue'); // Falls back to blue (no valid close date)
      });

      it('handles empty date strings', () => {
        const status = getPipelineStatus(incompleteChecklist, '', 7);
        expect(status).toBe('blue'); // Falls back to blue
      });
    });

    describe('warningDays parameter validation', () => {
      const incompleteChecklist: ChecklistPeriod = {
        id: 'period1',
        client_id: 'client1',
        period: '2026-04',
        step_1_complete: false,
        step_2_complete: false,
        step_3_complete: false,
        step_4_complete: false,
        step_5_complete: false,
      };

      it('normalizes negative warning days to 0', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-20', -5);
        // With 0 warning days, only "today" triggers yellow
        expect(status).toBe('blue');
      });

      it('uses default warning days when not specified', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-20');
        expect(status).toBe('yellow'); // Within 7-day default
      });

      it('floors fractional warning days', () => {
        const status = getPipelineStatus(incompleteChecklist, '2026-04-17', 2.9);
        expect(status).toBe('yellow'); // 2.9 floored to 2, and 2 days away
      });
    });
  });
});
