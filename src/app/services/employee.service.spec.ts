// src/app/services/employee.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { mockEmployees } from '../mock/employees.mock';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all employees', () => {
    const employees = service.getAllEmployees();
    expect(employees.length).toBe(mockEmployees.length);
    expect(employees).toEqual(mockEmployees);
  });

  it('should return an employee by ID', () => {
    const emp = mockEmployees[0];
    const found = service.getEmployeeById(emp.id);
    expect(found).toEqual(emp);
  });

  it('should return null if employee ID does not exist', () => {
    const found = service.getEmployeeById(999999);
    expect(found).toBeNull();
  });

  it('should update an employee successfully', () => {
    const emp = mockEmployees[0];
    const updated = service.updateEmployee(emp.id, { name: 'Updated Name' });
    expect(updated).toBeTrue();
    const updatedEmp = service.getEmployeeById(emp.id);
    expect(updatedEmp?.name).toBe('Updated Name');
  });

  it('should fail to update a non-existing employee', () => {
    const updated = service.updateEmployee(999999, { name: 'Non-existing' });
    expect(updated).toBeFalse();
  });
});
