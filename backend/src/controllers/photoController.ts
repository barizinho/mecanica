import { allAsync, getAsync, runAsync } from '../database/db';

export async function getPhotosByServiceId(service_id: number) {
  return await allAsync(
    'SELECT * FROM photos WHERE service_id = ? ORDER BY created_at',
    [service_id]
  );
}

export async function addPhoto(service_id: number, file_path: string, photo_type?: string) {
  const result = await runAsync(
    'INSERT INTO photos (service_id, file_path, photo_type) VALUES (?, ?, ?)',
    [service_id, file_path, photo_type || null]
  );
  return result.id;
}

export async function deletePhoto(id: number) {
  await runAsync('DELETE FROM photos WHERE id = ?', [id]);
}
