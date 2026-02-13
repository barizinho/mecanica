import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Owner } from '../types';
import { OwnerForm } from '../components/OwnerForm';

export function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const { request, loading, error, setError } = useApi();

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const data = await request('GET', '/owners');
      setOwners(data);
    } catch (error) {
      console.error('Erro ao carregar proprietários:', error);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedOwner) {
        await request('PUT', `/owners/${selectedOwner.id}`, formData);
        setSelectedOwner(null);
      } else {
        await request('POST', '/owners', formData);
      }
      setShowForm(false);
      await loadOwners();
      setError(null);
    } catch (error) {
      console.error('Erro ao salvar proprietário:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Deseja deletar este proprietário?')) {
      try {
        await request('DELETE', `/owners/${id}`);
        await loadOwners();
      } catch (error) {
        console.error('Erro ao deletar proprietário:', error);
      }
    }
  };

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h2>Proprietários</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          className="primary"
          onClick={() => {
            setSelectedOwner(null);
            setShowForm(!showForm);
          }}
        >
          {showForm && !selectedOwner ? 'Cancelar' : 'Novo Proprietário'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{selectedOwner ? 'Editar Proprietário' : 'Novo Proprietário'}</h3>
          <OwnerForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error || undefined}
            initialData={selectedOwner}
          />
        </div>
      )}

      <div className="grid">
        {owners.map(owner => (
          <div key={owner.id} className="card">
            <h4>{owner.name}</h4>
            {owner.email && <p>Email: {owner.email}</p>}
            {owner.phone && <p>Telefone: {owner.phone}</p>}
            {owner.cpf && <p>CPF: {owner.cpf}</p>}
            <div className="button-group">
              <button
                className="primary"
                onClick={() => handleEdit(owner)}
              >
                Editar
              </button>
              <button
                className="danger"
                onClick={() => handleDelete(owner.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {owners.length === 0 && !showForm && (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          Nenhum proprietário cadastrado
        </p>
      )}
    </div>
  );
}
