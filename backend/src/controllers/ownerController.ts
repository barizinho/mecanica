import { allAsync, getAsync, runAsync } from '../database/db';

export async function getAllOwners() {
  return await allAsync('SELECT * FROM owners ORDER BY created_at DESC');
}

export async function getOwnerById(id: number) {
  return await getAsync('SELECT * FROM owners WHERE id = ?', [id]);
}

export async function createOwner(name: string, email?: string, phone?: string, cpf?: string) {
  const result = await runAsync(
    'INSERT INTO owners (name, email, phone, cpf) VALUES (?, ?, ?, ?)',
    [name, email || null, phone || null, cpf || null]
  );
  return result.id;
}

export async function updateOwner(id: number, name: string, email?: string, phone?: string) {
  await runAsync(
    'UPDATE owners SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email || null, phone || null, id]
  );
}

export async function deleteOwner(id: number) {
  await runAsync('DELETE FROM owners WHERE id = ?', [id]);
}
