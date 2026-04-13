import type { ChecklistPeriod, PipelineStatus } from '../types';

/**
 * Pipeline status color mapping for UI display
 * Based on ADR Section 4 - Pipeline Status (computed)
 */
export const STATUS_COLORS: Record<PipelineStatus, string> = {
  grey: '#9CA3AF', // No checklist period
  green: '#10B981', // All steps complete
  blue: '#3B82F6', // In progress, on track
  yellow: '#F59E0B', // Warning: close date approaching
  red: '#EF4444', // Overdue: close date passed
};

/**
 * Default warning window in days before close date triggers yellow status
 */
export const DEFAULT_WARNING_DAYS = 7;

/**
 * Check if all 5 checklist steps are complete
 */
function areAllStepsComplete(checklist: ChecklistPeriod): boolean {
  return (
    checklist.step_1_complete &&
    checklist.step_2_complete &&
    checklist.step_3_complete &&
    checklist.step_4_complete &&
    checklist.step_5_complete
  );
}

/**
 * Calculate days from today until the close date
 * @returns positive number if future, negative if past, undefined if no close date
 */
function getDaysUntilClose(closeDate: string | undefined): number | undefined {
  if (!closeDate) {
    return undefined;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for consistent day calculation

  const closeDateObj = new Date(closeDate);

  // Validate that the date string was parseable
  if (isNaN(closeDateObj.getTime())) {
    return undefined;
  }

  closeDateObj.setHours(0, 0, 0, 0);

  const diffMs = closeDateObj.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Derive pipeline status from checklist data and close date
 *
 * Status Logic (ADR Section 4):
 * - Grey: No checklist period for current period
 * - Green: All 5 steps complete
 * - Blue: Steps partially complete, not within warning window
 * - Yellow: Within warning window + any step incomplete
 * - Red: Close date passed + any step incomplete
 *
 * @param checklistPeriod - Current period checklist (undefined = no period)
 * @param closeDate - ISO date string for period close date
 * @param warningDays - Days before close date to trigger yellow status (default: 7)
 * @returns PipelineStatus enum value
 */
export function getPipelineStatus(
  checklistPeriod: ChecklistPeriod | undefined,
  closeDate: string | undefined,
  warningDays: number = DEFAULT_WARNING_DAYS
): PipelineStatus {
  // Validate and normalize warningDays to prevent negative values or non-integers
  const normalizedWarningDays = Math.max(0, Math.floor(warningDays));

  // Grey: No checklist period exists for current period
  if (!checklistPeriod) {
    return 'grey';
  }

  // Green: All 5 steps are complete
  if (areAllStepsComplete(checklistPeriod)) {
    return 'green';
  }

  // At this point, we know steps are incomplete
  const daysUntilClose = getDaysUntilClose(closeDate);

  // Red: Close date has passed (negative days)
  if (daysUntilClose !== undefined && daysUntilClose < 0) {
    return 'red';
  }

  // Yellow: Within warning window and incomplete
  if (daysUntilClose !== undefined && daysUntilClose <= normalizedWarningDays) {
    return 'yellow';
  }

  // Blue: In progress, not yet within warning window
  // (or no close date set)
  return 'blue';
}
