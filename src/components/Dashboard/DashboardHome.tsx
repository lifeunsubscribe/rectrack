import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import type { Account, PipelineStatus } from '../../types';
import { STATUS_COLORS } from '../../utils/pipelineStatus';

interface DashboardHomeProps {
  clients: ClientWithMetadata[];
  accounts: Account[];
  onClientClick: (clientId: string) => void;
}

const STATUS_LABELS: Record<PipelineStatus, string> = {
  grey: 'Not started',
  green: 'Complete',
  blue: 'In progress',
  yellow: 'Warning',
  red: 'Overdue',
};

function DashboardHome({ clients, accounts, onClientClick }: DashboardHomeProps) {
  const today = new Date();
  const todayLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const totalClients = clients.length;
  const openQuestions = clients.reduce((sum, c) => sum + c.openQuestionCount, 0);

  const statusCounts: Record<PipelineStatus, number> = {
    grey: 0,
    green: 0,
    blue: 0,
    yellow: 0,
    red: 0,
  };
  for (const c of clients) {
    statusCounts[c.pipelineStatus] += 1;
  }

  const atRiskClients = clients.filter(
    (c) => c.pipelineStatus === 'yellow' || c.pipelineStatus === 'red',
  );

  const pastDueAccounts = accounts.filter((a) => {
    if (!a.close_date || a.archived) return false;
    const close = new Date(a.close_date);
    return close < today;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>{todayLabel}</p>
      </div>

      <div style={styles.summaryGrid}>
        <SummaryCard label="Active clients" value={totalClients} accent="#3B82F6" />
        <SummaryCard label="Open questions" value={openQuestions} accent="#8B5CF6" />
        <SummaryCard
          label="Clients needing attention"
          value={atRiskClients.length}
          accent={STATUS_COLORS.yellow}
        />
        <SummaryCard
          label="Past-due accounts"
          value={pastDueAccounts.length}
          accent={STATUS_COLORS.red}
        />
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Pipeline at a glance</h2>
        <div style={styles.pipelineRow}>
          {(Object.keys(statusCounts) as PipelineStatus[]).map((status) => (
            <div key={status} style={styles.pipelineChip}>
              <span
                style={{
                  ...styles.pipelineDot,
                  backgroundColor: STATUS_COLORS[status],
                }}
                aria-hidden="true"
              />
              <span style={styles.pipelineCount}>{statusCounts[status]}</span>
              <span style={styles.pipelineLabel}>{STATUS_LABELS[status]}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Needs attention
          {atRiskClients.length > 0 && (
            <span style={styles.sectionCount}>({atRiskClients.length})</span>
          )}
        </h2>
        {atRiskClients.length === 0 ? (
          <p style={styles.emptyState}>
            Nothing flagged right now — everything's on track.
          </p>
        ) : (
          <ul style={styles.attentionList}>
            {atRiskClients.map((c) => (
              <li key={c.client.id}>
                <button
                  type="button"
                  onClick={() => onClientClick(c.client.id)}
                  style={styles.attentionRow}
                >
                  <span
                    style={{
                      ...styles.statusPill,
                      backgroundColor: STATUS_COLORS[c.pipelineStatus],
                    }}
                  >
                    {STATUS_LABELS[c.pipelineStatus]}
                  </span>
                  <span style={styles.clientName}>{c.client.name}</span>
                  <span style={styles.rowMeta}>
                    Step {c.currentStep}/5
                    {c.openQuestionCount > 0 &&
                      ` · ${c.openQuestionCount} open question${c.openQuestionCount === 1 ? '' : 's'}`}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div style={{ ...styles.card, borderLeftColor: accent }}>
      <div style={styles.cardValue}>{value}</div>
      <div style={styles.cardLabel}>{label}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '32px',
    maxWidth: '1100px',
  },
  header: {
    marginBottom: '28px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '4px',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderLeft: '4px solid',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  cardValue: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1,
  },
  cardLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '8px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionCount: {
    fontSize: '13px',
    fontWeight: 400,
    color: '#9ca3af',
  },
  pipelineRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  pipelineChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '13px',
  },
  pipelineDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  pipelineCount: {
    fontWeight: 600,
    color: '#111827',
  },
  pipelineLabel: {
    color: '#6b7280',
  },
  emptyState: {
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    border: '1px dashed #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    margin: 0,
  },
  attentionList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  attentionRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '12px 16px',
    textAlign: 'left',
    cursor: 'pointer',
    font: 'inherit',
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
  },
  statusPill: {
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    padding: '3px 8px',
    borderRadius: '4px',
    minWidth: '72px',
    textAlign: 'center',
  },
  clientName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    flex: 1,
  },
  rowMeta: {
    fontSize: '12px',
    color: '#6b7280',
  },
};

export default DashboardHome;
