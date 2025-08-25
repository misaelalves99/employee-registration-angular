// src/app/pages/employee-page/edit-page/edit-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { Position, POSITIONS_MUTABLE } from '../../../types/position.model';
import { getEmployeeById, updateMockEmployee } from '../../../mock/employees.mock';
import { getMockDepartments } from '../../../mock/departments.mock';
import { EmployeeForm } from '../../../types/employee-form.model';

@Component({
  selector: 'app-edit-employee-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditComponent implements OnInit {
  employee: EmployeeForm | null = null;
  departments: Department[] = [];
  positions: Position[] = [];
  loading = true;
  errors: string[] = [];

  textFields: (keyof Pick<EmployeeForm, 'name' | 'cpf' | 'email' | 'phone' | 'address'>)[] = [
    'name',
    'cpf',
    'email',
    'phone',
    'address',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = getEmployeeById(id);

    if (!data) {
      this.errors = ['Funcionário não encontrado'];
      this.loading = false;
      return;
    }

    const [deps, pos] = await Promise.all([getMockDepartments(), Promise.resolve(POSITIONS_MUTABLE)]);
    this.departments = deps;
    this.positions = pos;

    this.employee = {
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      position: data.position,
      departmentId: data.department?.id,
      salary: data.salary,
      admissionDate: data.admissionDate.slice(0, 10),
      isActive: data.isActive,
    };

    this.loading = false;
  }

  onSubmit(): void {
    if (!this.employee) return;

    // Use undefined if no department is selected (departmentId is undefined or null)
    const department = this.employee.departmentId
      ? this.departments.find((d) => d.id === this.employee!.departmentId!) // Added non-null assertion for departmentId
      : undefined;

    const updated = updateMockEmployee(this.employee.id, {
      ...this.employee,
      department,
      // Ensure departmentId is explicitly set to undefined if no department is selected
      departmentId: this.employee.departmentId || undefined,
    });

    if (updated) {
      console.log('Funcionário atualizado com sucesso!'); // Changed alert to console.log
      this.router.navigate(['/funcionarios']);
    } else {
      this.errors = ['Erro ao salvar dados do funcionário.'];
    }
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
