import { useState } from 'react';

interface ChecklistProps {
  items: any[];
  onAddItem: (description: string) => void;
  onUpdateItem: (id: number, completed: boolean) => void;
  loading?: boolean;
}

export function Checklist({ items, onAddItem, onUpdateItem, loading }: ChecklistProps) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(newItem);
      setNewItem('');
    }
  };

  return (
    <div className="card">
      <h3>Checklist de Serviços</h3>
      
      <div className="form-group">
        <label htmlFor="newItem">Novo Item</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            id="newItem"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Descrever serviço..."
            disabled={loading}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="primary"
            onClick={handleAddItem}
            disabled={loading || !newItem.trim()}
          >
            Adicionar
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <ul className="list-group">
          {items.map(item => (
            <li key={item.id} className="list-group-item">
              <div className="list-group-item-content">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => onUpdateItem(item.id, e.target.checked)}
                  disabled={loading}
                  style={{ marginRight: '10px' }}
                />
                <span style={{
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? '#999' : '#333'
                }}>
                  {item.item_description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
          Nenhum item adicionado ainda
        </p>
      )}
    </div>
  );
}
