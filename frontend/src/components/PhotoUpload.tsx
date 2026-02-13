import { useState } from 'react';

interface PhotoUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export function PhotoUpload({ onUpload, loading }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <div className="card">
      <h3>Captura de Fotos</h3>
      <div className="form-group">
        <label htmlFor="photo">Selecionar Foto</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          capture="environment"
        />
      </div>
      {preview && (
        <div>
          <p style={{ color: '#666', marginBottom: '10px' }}>Prévia:</p>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              borderRadius: '4px'
            }}
          />
        </div>
      )}
    </div>
  );
}
