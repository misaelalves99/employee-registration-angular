// src/app/mock/departments.mock.ts

import { Department } from '../types/department.model';

export const mockDepartments: Department[] = [
  { id: 1, name: 'TI' },
  { id: 2, name: 'RH' },
  { id: 3, name: 'Marketing' },
];

export async function getMockDepartments(): Promise<Department[]> {
  return mockDepartments;
}
