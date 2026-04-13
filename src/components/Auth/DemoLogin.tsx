import { useState, type FormEvent } from 'react';

interface DemoLoginProps {
  onAuthenticate: (email: string) => void;
}

// Demo-only credentials. This is clearly a prototype gate — real auth
// (Lambda + bcrypt + JWT + SSM-backed secret) is scoped for implementation.
const DEMO_CREDENTIALS: Record<string, string> = {
  'jen@rectrack.demo': 'demo',
  'katie@rectrack.demo': 'demo',
};

function DemoLogin({ onAuthenticate }: DemoLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (DEMO_CREDENTIALS[normalized] && DEMO_CREDENTIALS[normalized] === password) {
      onAuthenticate(normalized);
    } else {
      setError('Those credentials didn\'t match. Try the demo login below.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <span style={styles.brandMark}>✦</span>
          <h1 style={styles.brand}>rectrack</h1>
        </div>
        <p style={styles.tagline}>
          CPA reconciliation workflow, at a glance.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <span style={styles.labelText}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              style={styles.input}
              autoComplete="email"
              required
            />
          </label>

          <label style={styles.label}>
            <span style={styles.labelText}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              style={styles.input}
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.submit}>
            Sign in
          </button>
        </form>

        <div style={styles.hint}>
          <div style={styles.hintTitle}>Demo credentials</div>
          <div style={styles.hintRow}>
            <code style={styles.code}>jen@rectrack.demo</code>
            <span style={styles.hintSep}>·</span>
            <code style={styles.code}>demo</code>
          </div>
          <div style={styles.hintNote}>
            Prototype build — not connected to a live backend yet.
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    backgroundImage: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    padding: '24px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
    padding: '36px 32px 28px',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '4px',
  },
  brandMark: {
    fontSize: '22px',
    color: '#3B82F6',
  },
  brand: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  tagline: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: 0,
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  labelText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  input: {
    fontSize: '14px',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  error: {
    fontSize: '13px',
    color: '#b91c1c',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    padding: '8px 12px',
  },
  submit: {
    marginTop: '4px',
    padding: '10px 16px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  hint: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #f3f4f6',
  },
  hintTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '8px',
  },
  hintRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  code: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '12px',
    backgroundColor: '#f3f4f6',
    padding: '3px 8px',
    borderRadius: '4px',
    color: '#111827',
  },
  hintSep: {
    color: '#d1d5db',
  },
  hintNote: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
};

export default DemoLogin;
