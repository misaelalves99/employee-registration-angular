// src/app/services/employee.service.ts

// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { Employee } from '../types/employee.model';
import { mockEmployees, updateMockEmployee } from '../mock/employees.mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = mockEmployees;

  getEmployeeById(id: number): Employee | null {
    return this.employees.find(emp => emp.id === id) ?? null;
  }

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  updateEmployee(id: number, data: Partial<Employee>): boolean {
    return updateMockEmployee(id, data);
  }
}
