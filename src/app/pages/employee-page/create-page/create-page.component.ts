// src/app/pages/employee-page/create-page/create-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { Position, POSITIONS_MUTABLE } from '../../../types/position.model';
import { createMockEmployee } from '../../../mock/employees.mock';
import { getMockDepartments } from '../../../mock/departments.mock';
import { EmployeeForm } from '../../../types/employee-form.model';

@Component({
  selector: 'app-create-employee-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  departments: Department[] = [];
  positions: Position[] = [];
  loading = true;
  errors: string[] = [];

  // Inicializa formData com os mesmos campos do EmployeeForm
  formData: EmployeeForm = {
    id: 0,
    name: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    position: '' as Position,
    departmentId: undefined, // Changed from null to undefined for consistency
    salary: 0,
    admissionDate: new Date().toISOString().slice(0, 10),
    isActive: true,
  };

  textFields: (keyof Pick<EmployeeForm, 'name' | 'cpf' | 'email' | 'phone' | 'address'>)[] = [
    'name',
    'cpf',
    'email',
    'phone',
    'address',
  ];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const [deps, pos] = await Promise.all([getMockDepartments(), Promise.resolve(POSITIONS_MUTABLE)]);
    this.departments = deps;
    this.positions = pos;
    this.loading = false;
  }

  async handleSubmit(): Promise<void> {
    // Validação básica
    if (
      !this.formData.name ||
      !this.formData.cpf ||
      !this.formData.email ||
      !this.formData.salary ||
      !this.formData.position
    ) {
      console.error('Por favor, preencha todos os campos obrigatórios.'); // Changed alert to console.error
      this.errors = ['Por favor, preencha todos os campos obrigatórios.'];
      return;
    }

    // Find the department object if departmentId is set
    const department = this.formData.departmentId
      ? this.departments.find((d) => d.id === this.formData.departmentId)
      : undefined;

    await createMockEmployee({
      ...this.formData,
      id: Date.now(), // gera ID único
      department: department,
    });

    console.log('Funcionário criado com sucesso!'); // Changed alert to console.log
    this.router.navigate(['/funcionarios']);
  }

  isOptional(field: string): boolean {
    return field === 'phone' || field === 'address';
  }

  getLabel(field: keyof EmployeeForm): string {
    const labels: Record<keyof EmployeeForm, string> = {
      id: 'ID',
      name: 'Nome',
      cpf: 'CPF',
      email: 'Email',
      phone: 'Telefone',
      address: 'Endereço',
      position: 'Cargo',
      departmentId: 'Departamento',
      salary: 'Salário',
      admissionDate: 'Data de Admissão',
      isActive: 'Status',
    };
    return labels[field] || field;
  }
}
