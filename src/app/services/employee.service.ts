// src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { Employee } from '../types/employee.model';
import { Department } from '../types/department.model';
import { Position } from '../types/position.model';

// Dados iniciais
const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: 'TI' },
  { id: 2, name: 'RH' },
  { id: 3, name: 'Marketing' },
];

const INITIAL_POSITIONS: Position[] = [
  'Desenvolvedor',
  'Analista',
  'Gerente',
  'Estagiário',
  'Outro',
];

const INITIAL_EMPLOYEES: Employee[] = [
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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [...INITIAL_EMPLOYEES];
  private departments: Department[] = [...INITIAL_DEPARTMENTS];
  private positions: Position[] = [...INITIAL_POSITIONS];

  private nextEmployeeId: number = Math.max(...this.employees.map(e => e.id)) + 1;

  // ============================
  // EMPLOYEES
  // ============================
  getAllEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: number): Employee | null {
    return this.employees.find(e => e.id === id) ?? null;
  }

  createEmployee(data: Partial<Employee>): Employee {
    const department =
      data.departmentId != null
        ? this.departments.find(d => d.id === data.departmentId)
        : undefined;

    const newEmployee: Employee = {
      id: this.nextEmployeeId++,
      name: data.name || '',
      cpf: data.cpf || '',
      email: data.email || '',
      phone: data.phone,
      address: data.address,
      position: data.position || 'Outro',
      departmentId: department?.id,
      department: department,
      salary: data.salary || 0,
      admissionDate: data.admissionDate || new Date().toISOString().slice(0, 10),
      isActive: data.isActive ?? true,
    };

    this.employees.push(newEmployee);
    return newEmployee;
  }

  updateEmployee(id: number, data: Partial<Employee>): boolean {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) return false;

    let department = this.employees[index].department;
    if (data.departmentId != null) {
      department = this.departments.find(d => d.id === data.departmentId) || department;
    }

    this.employees[index] = {
      ...this.employees[index],
      ...data,
      department,
      departmentId: department?.id,
    };

    return true;
  }

  deleteEmployee(id: number): boolean {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.employees.splice(index, 1);
    return true;
  }

  // ============================
  // DEPARTMENTS
  // ============================
  getAllDepartments(): Department[] {
    return [...this.departments];
  }

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(d => d.id === id);
  }

  // ============================
  // POSITIONS
  // ============================
  getAllPositions(): Position[] {
    return [...this.positions];
  }

  addPosition(pos: Position): void {
    if (!this.positions.includes(pos)) {
      this.positions.push(pos);
    }
  }
}
