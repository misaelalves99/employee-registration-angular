// src/app/mock/employees.mock.spec.ts

import {
  mockEmployees,
  getEmployeeById,
  getAllMockEmployees,
  updateMockEmployee,
  createMockEmployee
} from './employees.mock';

describe('Employees Mock', () => {
  beforeEach(() => {
    // Reset mockEmployees se necessário (deep copy)
    while (mockEmployees.length > 2) {
      mockEmployees.pop();
    }
  });

  it('mockEmployees deve conter os funcionários iniciais', () => {
    expect(mockEmployees.length).toBe(2);
    expect(mockEmployees[0].name).toBe('João Silva');
    expect(mockEmployees[1].name).toBe('Maria Oliveira');
  });

  it('getEmployeeById retorna funcionário existente', () => {
    const emp = getEmployeeById(1);
    expect(emp).not.toBeNull();
    expect(emp?.name).toBe('João Silva');
  });

  it('getEmployeeById retorna null para ID inexistente', () => {
    const emp = getEmployeeById(999);
    expect(emp).toBeNull();
  });

  it('getAllMockEmployees mapeia campos corretamente', () => {
    const all = getAllMockEmployees();
    expect(all.length).toBe(2);
    expect(all[0].departmentName).toBe('TI');
    expect(all[1].active).toBeTrue();
  });

  it('updateMockEmployee atualiza funcionário existente', () => {
    const result = updateMockEmployee(1, { name: 'João Alterado', departmentId: 2 });
    expect(result).toBeTrue();
    const emp = getEmployeeById(1);
    expect(emp?.name).toBe('João Alterado');
    expect(emp?.department?.name).toBe('RH');
  });

  it('updateMockEmployee retorna false para funcionário inexistente', () => {
    const result = updateMockEmployee(999, { name: 'X' });
    expect(result).toBeFalse();
  });

  it('createMockEmployee adiciona um novo funcionário', async () => {
    const newEmp = {
      id: 3,
      name: 'Carlos',
      cpf: '111.222.333-44',
      email: 'carlos@example.com',
      phone: '(11) 97777-7777',
      address: 'Rua C, 789',
      position: 'Designer',
      departmentId: 3,
      salary: 4000,
      admissionDate: '2023-05-01',
      isActive: true,
      department: undefined
    } as any;

    await createMockEmployee(newEmp);
    const emp = getEmployeeById(3);
    expect(emp).not.toBeNull();
    expect(emp?.name).toBe('Carlos');
    expect(emp?.department?.name).toBe('Marketing');
  });
});
