import { useState } from 'react';
import { OwnersPage } from './pages/OwnersPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { ServicesPage } from './pages/ServicesPage';

type Page = 'dashboard' | 'owners' | 'vehicles' | 'services';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'owners':
        return <OwnersPage />;
      case 'vehicles':
        return <VehiclesPage />;
      case 'services':
        return <ServicesPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>🔧 Oficina Mecânica - Sistema de Checklist</h1>
          <nav style={{ marginTop: '15px' }}>
            <button
              className={`primary ${currentPage === 'dashboard' ? '' : 'secondary'}`}
              onClick={() => setCurrentPage('dashboard')}
              style={{ marginRight: '10px' }}
            >
              Dashboard
            </button>
            <button
              className={`primary ${currentPage === 'owners' ? '' : 'secondary'}`}
              onClick={() => setCurrentPage('owners')}
              style={{ marginRight: '10px' }}
            >
              Proprietários
            </button>
            <button
              className={`primary ${currentPage === 'vehicles' ? '' : 'secondary'}`}
              onClick={() => setCurrentPage('vehicles')}
              style={{ marginRight: '10px' }}
            >
              Veículos
            </button>
            <button
              className={`primary ${currentPage === 'services' ? '' : 'secondary'}`}
              onClick={() => setCurrentPage('services')}
            >
              Serviços
            </button>
          </nav>
        </div>
      </header>

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="container">
      <div className="card">
        <h2>Bem-vindo ao Sistema de Checklist</h2>
        <p>
          Este sistema foi desenvolvido para gerenciar os serviços de sua oficina mecânica.
        </p>
        <h3>Funcionalidades principais:</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Proprietários:</strong> Cadastre e gerencie os proprietários dos veículos</li>
          <li><strong>Veículos:</strong> Registre os veículos que chegam à oficina</li>
          <li><strong>Serviços:</strong> Crie checklists de serviços, capture fotos e obtenha assinatura</li>
          <li><strong>Histórico:</strong> Mantenha um registro completo de todos os reparos realizados</li>
        </ul>

        <h3 style={{ marginTop: '30px' }}>Como usar:</h3>
        <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Cadastre um novo proprietário em "Proprietários"</li>
          <li>Registre seu veículo em "Veículos"</li>
          <li>Crie um novo serviço em "Serviços"</li>
          <li>Complete o checklist de serviços conforme trabalha</li>
          <li>Capture fotos do estado do veículo</li>
          <li>Finalize com a assinatura do proprietário</li>
        </ol>

        <div style={{
          backgroundColor: '#e7f3ff',
          padding: '20px',
          borderRadius: '4px',
          marginTop: '30px',
          borderLeft: '4px solid #007bff'
        }}>
          <p style={{ margin: 0, color: '#004085' }}>
            💡 <strong>Dica:</strong> Use um dispositivo móvel para melhor experiência na captura de fotos e assinatura.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
