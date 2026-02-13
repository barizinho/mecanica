import { useState } from 'react';

interface VehicleFormProps {
  owner_id: number;
  onSubmit: (data: any) => void;
  loading?: boolean;
  error?: string;
  initialData?: any;
}

export function VehicleForm({ owner_id, onSubmit, loading, error, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    owner_id,
    plate: initialData?.plate || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    color: initialData?.color || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="plate">Placa *</label>
        <input
          id="plate"
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
          placeholder="ABC-1234"
          required
          disabled={loading || !!initialData}
        />
      </div>

      <div className="form-group">
        <label htmlFor="model">Modelo *</label>
        <input
          id="model"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Ex: Gol, Chevrolet, etc"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Ano</label>
        <input
          id="year"
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="color">Cor</label>
        <input
          id="color"
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Ex: Branco, Preto, etc"
          disabled={loading}
        />
      </div>

      <div className="button-group">
        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Carregando...' : initialData ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}
