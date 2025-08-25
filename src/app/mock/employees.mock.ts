// src/app/mock/employees.mock.ts

// src/app/mock/employees.mock.ts

import { Employee } from '../types/employee.model';
import { mockDepartments } from './departments.mock';

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua A, 123',
    position: 'Desenvolvedor',
    department: { id: 1, name: 'TI' },
    departmentId: 1,
    salary: 5500,
    admissionDate: '2022-01-15',
    isActive: false,
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    cpf: '987.654.321-00',
    email: 'maria@example.com',
    phone: '(11) 98888-8888',
    address: 'Rua B, 456',
    position: 'Analista',
    department: { id: 2, name: 'RH' },
    departmentId: 2,
    salary: 4700,
    admissionDate: '2021-10-20',
    isActive: true,
  },
];

// Retorna um employee pelo ID
export function getEmployeeById(id: number): Employee | null {
  return mockEmployees.find(e => e.id === id) ?? null;
}

// Retorna todos os employees com campos auxiliares
export function getAllMockEmployees(): Employee[] {
  return mockEmployees.map(emp => ({
    ...emp,
    departmentName: emp.department?.name ?? '-',
    hiredDate: emp.admissionDate,
    active: emp.isActive,
  }));
}

// Atualiza um employee existente
export function updateMockEmployee(id: number, data: Partial<Employee>): boolean {
  const index = mockEmployees.findIndex(e => e.id === id);
  if (index !== -1) {
    // Garantir department correto
    const department =
      data.departmentId != null
        ? mockDepartments.find(d => d.id === data.departmentId)
        : undefined;

    mockEmployees[index] = {
      ...mockEmployees[index],
      ...data,
      department,
      departmentId: department?.id ?? undefined,
    };
    return true;
  }
  return false;
}

// Cria um novo employee
export async function createMockEmployee(newEmployee: Employee): Promise<void> {
  const department =
    newEmployee.departmentId != null
      ? mockDepartments.find(d => d.id === newEmployee.departmentId)
      : undefined;

  mockEmployees.push({
    ...newEmployee,
    department,
    departmentId: department?.id ?? undefined,
  });

  console.log('Funcionário criado:', {
    ...newEmployee,
    departmentName: department?.name ?? '-',
  });
}

// Busca o nome do departamento pelo ID
function getDepartmentNameById(id: number): string {
  const dep = mockDepartments.find(d => d.id === id);
  return dep ? dep.name : 'Desconhecido';
}
