import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Service, ChecklistItem, Photo } from '../types';
import { Checklist } from '../components/Checklist';
import { PhotoUpload } from '../components/PhotoUpload';
import { SignaturePad } from '../components/SignaturePad';

export function ServicePage({ serviceId }: { serviceId: number }) {
  const [service, setService] = useState<Service | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { request, loading, error } = useApi();

  useEffect(() => {
    loadService();
    loadChecklist();
    loadPhotos();
  }, [serviceId]);

  const loadService = async () => {
    try {
      const data = await request('GET', `/services/${serviceId}`);
      setService(data);
    } catch (error) {
      console.error('Erro ao carregar serviço:', error);
    }
  };

  const loadChecklist = async () => {
    try {
      const data = await request('GET', `/services/${serviceId}/checklist`);
      setChecklist(data);
    } catch (error) {
      console.error('Erro ao carregar checklist:', error);
    }
  };

  const loadPhotos = async () => {
    try {
      const data = await request('GET', `/services/${serviceId}/photos`);
      setPhotos(data);
    } catch (error) {
      console.error('Erro ao carregar fotos:', error);
    }
  };

  const handleAddChecklistItem = async (description: string) => {
    try {
      await request('POST', `/services/${serviceId}/checklist`, { item_description: description });
      await loadChecklist();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleUpdateChecklistItem = async (id: number, completed: boolean) => {
    try {
      await request('PUT', `/services/checklist/${id}`, { completed });
      await loadChecklist();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('photo_type', 'general');

    try {
      await request('POST', `/services/${serviceId}/photos`, formData);
      await loadPhotos();
    } catch (error) {
      console.error('Erro ao fazer upload de foto:', error);
    }
  };

  const handleSignatureSave = async (signature: string) => {
    try {
      const blob = await fetch(signature).then(r => r.blob());
      const formData = new FormData();
      formData.append('signature', blob, 'signature.png');
      
      await request('POST', `/services/${serviceId}/close`, formData);
      await loadService();
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
    }
  };

  if (!service) {
    return <div className="loading">Carregando serviço...</div>;
  }

  return (
    <div className="container">
      <h2>Serviço de {service.owner_name}</h2>
      <div className="card">
        <p><strong>Veículo:</strong> {service.vehicle_plate} - {service.vehicle_model}</p>
        <p><strong>Status:</strong> {service.status}</p>
        <p><strong>Entrada:</strong> {new Date(service.entry_date).toLocaleString('pt-BR')}</p>
        {service.exit_date && (
          <p><strong>Saída:</strong> {new Date(service.exit_date).toLocaleString('pt-BR')}</p>
        )}
      </div>

      <Checklist
        items={checklist}
        onAddItem={handleAddChecklistItem}
        onUpdateItem={handleUpdateChecklistItem}
        loading={loading}
      />

      <PhotoUpload onUpload={handlePhotoUpload} loading={loading} />

      {photos.length > 0 && (
        <div className="card">
          <h3>Fotos do Serviço</h3>
          <div className="grid">
            {photos.map(photo => (
              <img
                key={photo.id}
                src={photo.file_path}
                alt="Foto do serviço"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '4px'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {service.status === 'open' && (
        <SignaturePad onSave={handleSignatureSave} loading={loading} />
      )}
    </div>
  );
}
