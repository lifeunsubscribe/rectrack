import { useState } from 'react';
import type { AccountType } from '../types';

/**
 * Hook for managing account field visibility preferences
 * Stores local state for field visibility/order per account type
 * Note: Demo version - no persistence to backend
 */

export interface FieldPreference {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

const DEFAULT_FIELDS: FieldPreference[] = [
  { key: 'type', label: 'Account Type', visible: true, order: 1 },
  { key: 'institution_name', label: 'Institution', visible: true, order: 2 },
  { key: 'location', label: 'Location', visible: true, order: 3 },
  { key: 'bank_url', label: 'Bank URL', visible: true, order: 4 },
  { key: 'access_method', label: 'Access Method', visible: true, order: 5 },
  { key: 'rec_through_date', label: 'Rec-Through Date', visible: true, order: 6 },
  { key: 'close_date', label: 'Close Date', visible: true, order: 7 },
];

export function useFieldPreferences(_accountType: AccountType) {
  // Initialize field preferences from defaults
  // In production, this would load from user preferences API
  const [preferences, setPreferences] = useState<FieldPreference[]>(DEFAULT_FIELDS);

  // Toggle visibility for a specific field by key
  const toggleFieldVisibility = (fieldKey: string) => {
    setPreferences((prev) =>
      prev.map((field) =>
        field.key === fieldKey ? { ...field, visible: !field.visible } : field
      )
    );
  };

  // Reset all fields to default visibility and order
  const resetToDefaults = () => {
    setPreferences(DEFAULT_FIELDS);
  };

  // Get only visible fields, sorted by their configured order
  const visibleFields = preferences.filter((f) => f.visible).sort((a, b) => a.order - b.order);

  return {
    preferences,      // All field preferences (for modal display)
    visibleFields,    // Only visible fields (for metadata display)
    toggleFieldVisibility,
    resetToDefaults,
  };
}
