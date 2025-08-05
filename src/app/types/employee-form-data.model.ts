// app/types/employee-form-data.model.ts

import { Position } from './position.model';

export interface EmployeeFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  position: Position;
  departmentId: string;
  salary: string;
  admissionDate: string;
  isActive: boolean;
}
