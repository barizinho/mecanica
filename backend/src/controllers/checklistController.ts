import { allAsync, getAsync, runAsync } from '../database/db';

export async function getChecklistItemsByServiceId(service_id: number) {
  return await allAsync(
    'SELECT * FROM checklist_items WHERE service_id = ? ORDER BY id',
    [service_id]
  );
}

export async function addChecklistItem(service_id: number, item_description: string) {
  const result = await runAsync(
    'INSERT INTO checklist_items (service_id, item_description) VALUES (?, ?)',
    [service_id, item_description]
  );
  return result.id;
}

export async function updateChecklistItem(id: number, completed: boolean, notes?: string) {
  await runAsync(
    'UPDATE checklist_items SET completed = ?, notes = ? WHERE id = ?',
    [completed ? 1 : 0, notes || null, id]
  );
}

export async function deleteChecklistItem(id: number) {
  await runAsync('DELETE FROM checklist_items WHERE id = ?', [id]);
}
