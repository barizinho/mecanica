export interface Owner {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  cpf?: string;
  created_at: string;
}

export interface Vehicle {
  id: number;
  owner_id: number;
  owner_name?: string;
  plate: string;
  model: string;
  year?: number;
  color?: string;
  created_at: string;
}

export interface Service {
  id: number;
  vehicle_id: number;
  owner_id: number;
  vehicle_plate?: string;
  vehicle_model?: string;
  owner_name?: string;
  entry_date: string;
  exit_date?: string;
  description?: string;
  status: string;
  signature_path?: string;
  created_at: string;
}

export interface ChecklistItem {
  id: number;
  service_id: number;
  item_description: string;
  completed: boolean;
  notes?: string;
  created_at: string;
}

export interface Photo {
  id: number;
  service_id: number;
  file_path: string;
  photo_type?: string;
  created_at: string;
}
