import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  loading?: boolean;
}

export function SignaturePad({ onSave, loading }: SignaturePadProps) {
  const signatureCanvasRef = useRef<any>(null);

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const handleSave = () => {
    if (signatureCanvasRef.current && !signatureCanvasRef.current.isEmpty()) {
      const signatureData = signatureCanvasRef.current.toDataURL('image/png');
      onSave(signatureData);
    } else {
      alert('Por favor, assine antes de salvar');
    }
  };

  return (
    <div className="card">
      <h3>Assinatura do Proprietário</h3>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        Por favor, assine abaixo para confirmar os serviços realizados.
      </p>
      <div style={{
        border: '2px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        marginBottom: '15px'
      }}>
        <SignatureCanvas
          ref={signatureCanvasRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas'
          }}
        />
      </div>
      <div className="button-group">
        <button type="button" className="secondary" onClick={handleClear} disabled={loading}>
          Limpar
        </button>
        <button type="button" className="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Salvando...' : 'Confirmar Assinatura'}
        </button>
      </div>
    </div>
  );
}
