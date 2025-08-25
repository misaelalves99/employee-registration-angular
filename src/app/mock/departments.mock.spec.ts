// src/app/mock/departments.mock.spec.ts

import { mockDepartments, getMockDepartments } from './departments.mock';

describe('Departments Mock', () => {
  it('mockDepartments deve conter os departamentos esperados', () => {
    expect(mockDepartments.length).toBe(3);
    expect(mockDepartments).toEqual([
      { id: 1, name: 'TI' },
      { id: 2, name: 'RH' },
      { id: 3, name: 'Marketing' },
    ]);
  });

  it('getMockDepartments deve retornar uma Promise com os departamentos', async () => {
    const result = await getMockDepartments();
    expect(result).toEqual(mockDepartments);
  });
});
