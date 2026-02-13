import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Owner, Vehicle } from '../types';
import { VehicleForm } from '../components/VehicleForm';

export function VehiclesPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { request, loading, error } = useApi();

  useEffect(() => {
    loadOwners();
    loadVehicles();
  }, []);

  const loadOwners = async () => {
    try {
      const data = await request('GET', '/owners');
      setOwners(data);
    } catch (error) {
      console.error('Erro ao carregar proprietários:', error);
    }
  };

  const loadVehicles = async () => {
    try {
      const data = await request('GET', '/vehicles');
      setVehicles(data);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      await request('POST', '/vehicles', formData);
      setShowForm(false);
      setSelectedOwnerId(null);
      await loadVehicles();
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    if (window.confirm('Deseja deletar este veículo?')) {
      try {
        await request('DELETE', `/vehicles/${id}`);
        await loadVehicles();
      } catch (error) {
        console.error('Erro ao deletar veículo:', error);
      }
    }
  };

  const filteredVehicles = selectedOwnerId
    ? vehicles.filter(v => v.owner_id === selectedOwnerId)
    : vehicles;

  return (
    <div className="container">
      <h2>Veículos</h2>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Filtrar por Proprietário</h3>
        <select
          value={selectedOwnerId || ''}
          onChange={(e) => setSelectedOwnerId(e.target.value ? parseInt(e.target.value) : null)}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="">Todos os proprietários</option>
          {owners.map(owner => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>

        {selectedOwnerId && (
          <button
            className="primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Novo Veículo'}
          </button>
        )}
      </div>

      {showForm && selectedOwnerId && (
        <div className="card">
          <h3>Novo Veículo</h3>
          <VehicleForm
            owner_id={selectedOwnerId}
            onSubmit={handleSubmit}
            loading={loading}
            error={error || undefined}
          />
        </div>
      )}

      <div className="grid">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="card">
            <h4>{vehicle.plate}</h4>
            <p><strong>Modelo:</strong> {vehicle.model}</p>
            {vehicle.year && <p><strong>Ano:</strong> {vehicle.year}</p>}
            {vehicle.color && <p><strong>Cor:</strong> {vehicle.color}</p>}
            <p><strong>Proprietário:</strong> {vehicle.owner_name}</p>
            <div className="button-group">
              <button
                className="danger"
                onClick={() => handleDeleteVehicle(vehicle.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          {selectedOwnerId ? 'Nenhum veículo para este proprietário' : 'Nenhum veículo cadastrado'}
        </p>
      )}
    </div>
  );
}
