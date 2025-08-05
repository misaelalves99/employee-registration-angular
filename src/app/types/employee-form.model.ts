// src/app/types/employee-form.model.ts

import { Position } from './position.model';

export interface EmployeeForm {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  position: Position;
  departmentId: number | null;
  salary: number;
  admissionDate: string;
  isActive: boolean;
}
