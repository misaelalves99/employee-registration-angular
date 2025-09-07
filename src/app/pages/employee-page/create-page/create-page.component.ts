// src/app/pages/employee-page/create-page/create-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee.model';
import { EmployeeForm } from '../../../types/employee-form.model';
import { Department } from '../../../types/department.model';
import { Position } from '../../../types/position.model';

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

  formData: EmployeeForm = {
    id: 0,
    name: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    position: '' as Position,
    departmentId: undefined,
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

  constructor(private router: Router, private employeeService: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    // Carrega departamentos e posições do serviço
    this.departments = this.employeeService.getAllDepartments();
    this.positions = this.employeeService.getAllPositions();
    this.loading = false;
  }

  handleSubmit(): void {
    // Validação obrigatória
    if (
      !this.formData.name ||
      !this.formData.cpf ||
      !this.formData.email ||
      !this.formData.salary ||
      !this.formData.position
    ) {
      this.errors = ['Por favor, preencha todos os campos obrigatórios.'];
      console.error(this.errors[0]);
      return;
    }

    // Cria novo funcionário usando o serviço
    const newEmployee: Employee = this.employeeService.createEmployee({
      ...this.formData,
      departmentId: this.formData.departmentId || undefined,
    });

    console.log('Funcionário criado com sucesso!', newEmployee);
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
