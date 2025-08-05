// src/app/types/employee-basic.model.ts

export interface Employee {
  id: number;
  name: string;
  cpf: string;
  email: string;
  position: string;
  departmentName?: string | null;
}
