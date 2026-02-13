import { allAsync, getAsync, runAsync } from '../database/db';

export async function getAllVehicles() {
  return await allAsync(`
    SELECT v.*, o.name as owner_name 
    FROM vehicles v
    LEFT JOIN owners o ON v.owner_id = o.id
    ORDER BY v.created_at DESC
  `);
}

export async function getVehiclesByOwnerId(owner_id: number) {
  return await allAsync(
    'SELECT * FROM vehicles WHERE owner_id = ? ORDER BY created_at DESC',
    [owner_id]
  );
}

export async function getVehicleById(id: number) {
  return await getAsync(`
    SELECT v.*, o.name as owner_name 
    FROM vehicles v
    LEFT JOIN owners o ON v.owner_id = o.id
    WHERE v.id = ?
  `, [id]);
}

export async function createVehicle(owner_id: number, plate: string, model: string, year?: number, color?: string) {
  const result = await runAsync(
    'INSERT INTO vehicles (owner_id, plate, model, year, color) VALUES (?, ?, ?, ?, ?)',
    [owner_id, plate, model, year || null, color || null]
  );
  return result.id;
}

export async function updateVehicle(id: number, model: string, year?: number, color?: string) {
  await runAsync(
    'UPDATE vehicles SET model = ?, year = ?, color = ? WHERE id = ?',
    [model, year || null, color || null, id]
  );
}

export async function deleteVehicle(id: number) {
  await runAsync('DELETE FROM vehicles WHERE id = ?', [id]);
}

export async function getVehicleByPlate(plate: string) {
  return await getAsync('SELECT * FROM vehicles WHERE plate = ?', [plate]);
}
