import { useEffect, useState } from 'react';
import api from './services/api';
import CapteurForm from './components/CapteurForm.jsx';
import CapteurTable from './components/CapteurTable.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';

const pageStyles = {
  minHeight: '100vh',
  padding: '32px',
  backgroundColor: '#FFFFFF',
  color: '#334155',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const headerStyles = {
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '4px solid #F39200',
  color: '#F39200',
  fontSize: '2rem',
  fontWeight: 700,
};

const sectionStyles = {
  display: 'grid',
  gap: '24px',
  gridTemplateColumns: 'minmax(320px, 420px) 1fr',
  alignItems: 'start',
};

const searchSectionStyles = {
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const searchContainerStyles = {
  flex: '1 1 320px',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #F39200 0%, #0066CC 100%)',
  borderRadius: '999px',
  padding: '2px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
};

const searchInputStyles = {
  flex: 1,
  border: 'none',
  borderRadius: '999px',
  padding: '14px 18px',
  outline: 'none',
  fontSize: '1rem',
  color: '#0F172A',
  backgroundColor: '#FFFFFF',
};

const searchIconStyles = {
  marginLeft: '16px',
  marginRight: '12px',
  fontSize: '1.1rem',
  color: '#0F172A',
};

const brandBlockStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const brandLogoStyles = {
  display: 'block',
  paddingRight: '12px',
};

const brandTitleStyles = {
  fontSize: '2rem',
  fontWeight: 700,
  margin: 0,
  color: '#0F172A',
};

const brandSubtitleStyles = {
  margin: 0,
  color: '#475569',
  fontSize: '0.95rem',
};

const cardStyles = {
  backgroundColor: '#F8FAFC',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
};

const errorBox = {
  backgroundColor: '#FEE2E2',
  border: '1px solid #FCA5A5',
  color: '#991B1B',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '20px',
};

const emptyState = {
  padding: '24px',
  color: '#64748B',
  textAlign: 'center',
};

function App() {
  const initialForm = {
    reference: '',
    type: 'TEMPERATURE',
    valeurSeuil: '',
    statutActif: true,
  };

  const [capteurs, setCapteurs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCapteurs();
  }, []);

  const parseApiError = (error) => {
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (typeof data === 'object') {
        if (data.erreur) {
          return data.erreur;
        }
        return Object.values(data).join(' | ');
      }
    }
    return error.message || 'Erreur inconnue';
  };

  const fetchCapteurs = async () => {
    try {
      setErrorMessage('');
      // CORRECTION ICI : Remplacement de '/' par ''
      const response = await api.get('');
      setCapteurs(response.data);
    } catch (error) {
      setErrorMessage(parseApiError(error));
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      reference: form.reference.trim(),
      type: form.type,
      valeurSeuil: Number(form.valeurSeuil),
      statutActif: form.statutActif,
    };

    try {
      if (selectedId) {
        // La mise à jour est correcte (ex: /1)
        await api.put(`/${selectedId}`, payload);
      } else {
        // CORRECTION ICI : Remplacement de '/' par ''
        await api.post('', payload);
      }
      setForm(initialForm);
      setSelectedId(null);
      await fetchCapteurs();
    } catch (error) {
      setErrorMessage(parseApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (capteur) => {
    setSelectedId(capteur.id);
    setForm({
      reference: capteur.reference || '',
      type: capteur.type || 'TEMPERATURE',
      valeurSeuil: capteur.valeurSeuil ?? '',
      statutActif: capteur.statutActif ?? true,
    });
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setSelectedId(null);
    setForm(initialForm);
    setErrorMessage('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Confirmer la suppression du capteur ?');
    if (!confirmed) return;

    try {
      setErrorMessage('');
      await api.delete(`/${id}`);
      await fetchCapteurs();
      if (selectedId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      setErrorMessage(parseApiError(error));
    }
  };

  const filteredCapteurs = capteurs.filter((capteur) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      capteur.reference.toLowerCase().includes(query) ||
      capteur.type.toLowerCase().includes(query) ||
      String(capteur.valeurSeuil).includes(query)
    );
  });

  return (
    <div style={pageStyles}>
      <Header />
      <SearchBar value={searchQuery} onChange={handleSearchChange} placeholder="Rechercher par référence, type ou seuil..." />

      {errorMessage && <div style={errorBox}>{errorMessage}</div>}

      <div style={sectionStyles}>
        <section style={cardStyles}>
          <CapteurForm
            form={form}
            selectedId={selectedId}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        </section>

        <CapteurTable capteurs={filteredCapteurs} onEdit={startEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;