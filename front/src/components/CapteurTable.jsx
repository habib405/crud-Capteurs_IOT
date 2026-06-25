import React from 'react';

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
};

const thStyles = {
  textAlign: 'left',
  padding: '16px',
  borderBottom: '4px solid #F39200',
  color: '#334155',
  fontWeight: 700,
};

const tdStyles = {
  padding: '14px 16px',
  borderBottom: '1px solid #E2E8F0',
  color: '#4A4A4A',
};

const actionButton = {
  padding: '8px 12px',
  borderRadius: '10px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  color: '#334155',
  cursor: 'pointer',
  marginRight: '8px',
};

const statusBadge = (online) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: online ? '#166534' : '#b91c1c',
  fontWeight: 600,
});

const emptyState = {
  padding: '24px',
  color: '#64748B',
  textAlign: 'center',
};

export default function CapteurTable({ capteurs, onEdit, onDelete }) {
  return (
    <section>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Référence</th>
            <th style={thStyles}>Type</th>
            <th style={thStyles}>Seuil</th>
            <th style={thStyles}>Statut</th>
            <th style={thStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {capteurs.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ ...tdStyles, ...emptyState }}>
                Aucun capteur trouvé. Ajoutez-en un pour démarrer.
              </td>
            </tr>
          ) : (
            capteurs.map((capteur) => (
              <tr key={capteur.id}>
                <td style={tdStyles}>{capteur.reference}</td>
                <td style={tdStyles}>{capteur.type}</td>
                <td style={tdStyles}>{capteur.valeurSeuil}</td>
                <td style={tdStyles}>
                  <div style={statusBadge(capteur.statutActif)}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: capteur.statutActif ? '#16A34A' : '#DC2626',
                        display: 'inline-block',
                      }}
                    />
                    {capteur.statutActif ? 'En ligne' : 'Hors ligne'}
                  </div>
                </td>
                <td style={tdStyles}>
                  <button type="button" style={actionButton} onClick={() => onEdit(capteur)}>
                    Éditer
                  </button>
                  <button type="button" style={actionButton} onClick={() => onDelete(capteur.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
