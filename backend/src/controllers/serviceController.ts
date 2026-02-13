import { allAsync, getAsync, runAsync } from '../database/db';

export async function getAllServices() {
  return await allAsync(`
    SELECT s.*, v.plate, v.model, o.name as owner_name
    FROM services s
    LEFT JOIN vehicles v ON s.vehicle_id = v.id
    LEFT JOIN owners o ON s.owner_id = o.id
    ORDER BY s.entry_date DESC
  `);
}

export async function getServiceById(id: number) {
  return await getAsync(`
    SELECT s.*, v.plate, v.model, o.name as owner_name
    FROM services s
    LEFT JOIN vehicles v ON s.vehicle_id = v.id
    LEFT JOIN owners o ON s.owner_id = o.id
    WHERE s.id = ?
  `, [id]);
}

export async function getServicesByVehicleId(vehicle_id: number) {
  return await allAsync(
    'SELECT * FROM services WHERE vehicle_id = ? ORDER BY entry_date DESC',
    [vehicle_id]
  );
}

export async function createService(vehicle_id: number, owner_id: number, description?: string) {
  const result = await runAsync(
    'INSERT INTO services (vehicle_id, owner_id, description) VALUES (?, ?, ?)',
    [vehicle_id, owner_id, description || null]
  );
  return result.id;
}

export async function updateService(id: number, description?: string, exit_date?: string, status?: string) {
  await runAsync(
    'UPDATE services SET description = ?, exit_date = ?, status = ? WHERE id = ?',
    [description || null, exit_date || null, status || 'open', id]
  );
}

export async function closeService(id: number, signature_path?: string) {
  await runAsync(
    'UPDATE services SET exit_date = CURRENT_TIMESTAMP, status = ?, signature_path = ? WHERE id = ?',
    ['closed', signature_path || null, id]
  );
}

export async function deleteService(id: number) {
  await runAsync('DELETE FROM services WHERE id = ?', [id]);
}
