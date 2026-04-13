import type { FieldPreference } from '../../hooks/useFieldPreferences';

interface PanelEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: FieldPreference[];
  onToggleField: (fieldKey: string) => void;
  onReset: () => void;
}

/**
 * Edit Layout modal
 * Allows users to toggle field visibility for account metadata
 * Changes are local state only (no persistence in demo)
 */
export default function PanelEditModal({
  isOpen,
  onClose,
  preferences,
  onToggleField,
  onReset,
}: PanelEditModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#2c3e50', fontWeight: '600' }}>
            Edit Layout
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#7f8c8d',
              cursor: 'pointer',
              padding: '0',
              width: '30px',
              height: '30px',
            }}
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '20px' }}>
          Toggle field visibility for account metadata. Changes apply immediately.
        </p>

        {/* Field toggles */}
        <div style={{ marginBottom: '24px' }}>
          {preferences.map((field) => (
            <div
              key={field.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                borderBottom: '1px solid #ecf0f1',
              }}
            >
              <input
                type="checkbox"
                id={`field-${field.key}`}
                checked={field.visible}
                onChange={() => onToggleField(field.key)}
                style={{
                  marginRight: '12px',
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                }}
              />
              <label
                htmlFor={`field-${field.key}`}
                style={{
                  fontSize: '14px',
                  color: '#2c3e50',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                {field.label}
              </label>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <button
            onClick={onReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ecf0f1',
              color: '#2c3e50',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '4px',
              border: '1px solid #bdc3c7',
              cursor: 'pointer',
            }}
          >
            Reset to Defaults
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
