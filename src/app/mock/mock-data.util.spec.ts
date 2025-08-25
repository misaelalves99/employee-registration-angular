// src/app/mock/mock-data.util.spec.ts

import { getMockEmployees, deleteMockEmployee } from './mock-data.util';
import { Employee } from '../types/employee.model';

describe('mock-data.util', () => {
  const mockData: Employee[] = [
    {
      id: 1,
      name: 'João',
      cpf: '123',
      email: 'a@a.com',
      phone: '111',
      address: 'Rua A',
      position: 'Desenvolvedor',
      department: { id: 1, name: 'TI' },
      departmentId: 1,
      salary: 1000,
      admissionDate: '2022-01-01',
      isActive: true,
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '456',
      email: 'b@b.com',
      phone: '222',
      address: 'Rua B',
      position: 'Analista', // corrigido
      department: { id: 2, name: 'RH' },
      departmentId: 2,
      salary: 2000,
      admissionDate: '2022-02-01',
      isActive: false,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('mock_employees', JSON.stringify(mockData));
  });

  it('getMockEmployees retorna lista do localStorage', () => {
    const employees = getMockEmployees();
    expect(employees.length).toBe(2);
    expect(employees[0].name).toBe('João');
  });

  it('getMockEmployees retorna array vazio se não houver dados', () => {
    localStorage.removeItem('mock_employees');
    const employees = getMockEmployees();
    expect(employees).toEqual([]);
  });

  it('deleteMockEmployee remove funcionário pelo ID', () => {
    deleteMockEmployee(1);
    const employees = getMockEmployees();
    expect(employees.length).toBe(1);
    expect(employees[0].id).toBe(2);
  });

  it('deleteMockEmployee não altera array se ID não existir', () => {
    deleteMockEmployee(999);
    const employees = getMockEmployees();
    expect(employees.length).toBe(2);
  });
});
