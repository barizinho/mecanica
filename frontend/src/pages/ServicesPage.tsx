import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Owner, Vehicle, Service } from '../types';

export function ServicesPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');
  const { request, loading, error } = useApi();

  useEffect(() => {
    loadOwners();
    loadServices();
  }, []);

  useEffect(() => {
    if (selectedOwnerId) {
      loadVehiclesByOwner();
    }
  }, [selectedOwnerId]);

  const loadOwners = async () => {
    try {
      const data = await request('GET', '/owners');
      setOwners(data);
    } catch (error) {
      console.error('Erro ao carregar proprietários:', error);
    }
  };

  const loadVehiclesByOwner = async () => {
    if (!selectedOwnerId) return;
    try {
      const data = await request('GET', `/vehicles/owner/${selectedOwnerId}`);
      setVehicles(data);
      setSelectedVehicleId(null);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    }
  };

  const loadServices = async () => {
    try {
      const data = await request('GET', '/services');
      setServices(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  const handleCreateService = async () => {
    if (!selectedVehicleId || !selectedOwnerId) {
      alert('Selecione um veículo antes');
      return;
    }

    try {
      await request('POST', '/services', {
        vehicle_id: selectedVehicleId,
        owner_id: selectedOwnerId,
        description: serviceDescription,
      });
      setShowNewServiceForm(false);
      setServiceDescription('');
      await loadServices();
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
    }
  };

  const filteredServices = selectedVehicleId
    ? services.filter(s => s.vehicle_id === selectedVehicleId)
    : services;

  return (
    <div className="container">
      <h2>Serviços</h2>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Novo Serviço</h3>
        
        <div className="form-group">
          <label htmlFor="owner">Proprietário *</label>
          <select
            id="owner"
            value={selectedOwnerId || ''}
            onChange={(e) => setSelectedOwnerId(e.target.value ? parseInt(e.target.value) : null)}
            style={{ width: '100%' }}
          >
            <option value="">Selecionar proprietário</option>
            {owners.map(owner => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
        </div>

        {selectedOwnerId && vehicles.length > 0 && (
          <div className="form-group">
            <label htmlFor="vehicle">Veículo *</label>
            <select
              id="vehicle"
              value={selectedVehicleId || ''}
              onChange={(e) => setSelectedVehicleId(e.target.value ? parseInt(e.target.value) : null)}
              style={{ width: '100%' }}
            >
              <option value="">Selecionar veículo</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.plate} - {vehicle.model}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedVehicleId && (
          <>
            <div className="form-group">
              <label htmlFor="description">Descrição (opcional)</label>
              <textarea
                id="description"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                placeholder="Descrever serviços a serem realizados..."
                rows={3}
                style={{ width: '100%' }}
              />
            </div>
            <button
              className="primary"
              onClick={handleCreateService}
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Serviço'}
            </button>
          </>
        )}
      </div>

      <h3>Histórico de Serviços</h3>
      <div style={{ marginBottom: '20px' }}>
        <button
          className="secondary"
          onClick={() => setSelectedVehicleId(null)}
        >
          Ver Todos os Serviços
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Proprietário</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Veículo</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Entrada</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Saída</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(service => (
              <tr key={service.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{service.owner_name}</td>
                <td style={{ padding: '10px' }}>{service.vehicle_plate} - {service.vehicle_model}</td>
                <td style={{ padding: '10px' }}>
                  {new Date(service.entry_date).toLocaleString('pt-BR')}
                </td>
                <td style={{ padding: '10px' }}>
                  {service.exit_date
                    ? new Date(service.exit_date).toLocaleString('pt-BR')
                    : '-'}
                </td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    backgroundColor: service.status === 'closed' ? '#d4edda' : '#fff3cd',
                    color: service.status === 'closed' ? '#155724' : '#856404',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {service.status === 'closed' ? 'Fechado' : 'Aberto'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredServices.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          Nenhum serviço encontrado
        </p>
      )}
    </div>
  );
}
