// src/app/types/employee.model.ts

import { Department } from './department.model';
import { Position } from './position.model';

export interface Employee {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone?: string;
  address?: string;
  position: Position;
  department?: Department;
  departmentId?: number;
  salary: number;
  admissionDate: string;
  isActive: boolean;
  departmentName?: string;
  hiredDate?: string;
  active?: boolean;
}

// Filtros
export interface Filters {
  departmentId: string;
  position: string;
  isActive: string;
  admissionDateFrom: string;
  admissionDateTo: string;
}
