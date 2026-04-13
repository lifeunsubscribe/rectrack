import type { Account } from '../../types';
import type { FieldPreference } from '../../hooks/useFieldPreferences';

interface AccountMetadataProps {
  account: Account;
  visibleFields: FieldPreference[];
}

/**
 * Account metadata display section
 * Shows all account fields in read-only mode with editable appearance
 * Field visibility controlled by useFieldPreferences hook
 */
export default function AccountMetadata({ account, visibleFields }: AccountMetadataProps) {
  const getFieldValue = (key: string): string => {
    const value = account[key as keyof Account];
    if (value === undefined || value === null) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  const formatFieldLabel = (key: string): string => {
    return visibleFields.find((f) => f.key === key)?.label || key;
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ecf0f1',
        borderRadius: '6px',
        padding: '20px',
        marginBottom: '24px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
        Account Information
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {visibleFields.map((field) => (
          <div key={field.key}>
            <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '4px' }}>
              {formatFieldLabel(field.key)}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#2c3e50',
                padding: '8px 12px',
                backgroundColor: '#fafafa',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
              }}
            >
              {getFieldValue(field.key)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
