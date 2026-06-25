import React from 'react';

const inputStyles = {
  width: '100%',
  padding: '12px 14px',
  marginTop: '8px',
  marginBottom: '18px',
  borderRadius: '10px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  color: '#334155',
  fontSize: '1rem',
};

const buttonPrimary = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '14px 18px',
  backgroundColor: '#F39200',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 700,
  cursor: 'pointer',
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

export default function CapteurForm({
  form,
  selectedId,
  isSubmitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section>
      <h2 style={{ color: '#334155', marginBottom: '18px' }}>
        {selectedId ? 'Modifier le capteur' : 'Ajouter un nouveau capteur'}
      </h2>
      <form onSubmit={onSubmit}>
        <label style={{ display: 'block', fontWeight: 700, color: '#334155' }}>
          Référence
          <input
            style={inputStyles}
            name="reference"
            type="text"
            value={form.reference}
            onChange={onChange}
            placeholder="Saisir la référence"
            required
          />
        </label>

        <label style={{ display: 'block', fontWeight: 700, color: '#334155' }}>
          Type
          <select
            style={inputStyles}
            name="type"
            value={form.type}
            onChange={onChange}
            required
          >
            <option value="TEMPERATURE">TEMPERATURE</option>
            <option value="HUMIDITE">HUMIDITE</option>
            <option value="PRESSION">PRESSION</option>
          </select>
        </label>

        <label style={{ display: 'block', fontWeight: 700, color: '#334155' }}>
          Valeur seuil
          <input
            style={inputStyles}
            name="valeurSeuil"
            type="number"
            step="0.1"
            value={form.valeurSeuil}
            onChange={onChange}
            placeholder="-50 à 100"
            required
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <input
            name="statutActif"
            type="checkbox"
            checked={form.statutActif}
            onChange={onChange}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ color: '#334155', fontWeight: 700 }}>Statut actif</span>
        </label>

        <button type="submit" style={buttonPrimary} disabled={isSubmitting}>
          {selectedId ? 'Sauvegarder' : 'Créer le capteur'}
        </button>

        {selectedId && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              ...actionButton,
              marginTop: '12px',
              width: '100%',
              borderColor: '#F39200',
            }}
          >
            Annuler
          </button>
        )}
      </form>
    </section>
  );
}
