// src/app/pages/employee-page/edit-page/edit-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { Position, POSITIONS_MUTABLE } from '../../../types/position.model';
import { EmployeeForm } from '../../../types/employee-form.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-edit-employee-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = this.employeeService.getEmployeeById(id);

    if (!data) {
      this.errors = ['Funcionário não encontrado'];
      this.loading = false;
      return;
    }

    const [deps, pos] = await Promise.all([
      Promise.resolve(this.employeeService.getAllDepartments()),
      Promise.resolve(POSITIONS_MUTABLE),
    ]);

    this.departments = deps;
    this.positions = pos;

    // ⚡ Nunca usar null em departmentId
    this.employee = {
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      position: data.position,
      departmentId: data.departmentId ?? undefined, // undefined se não houver
      salary: data.salary,
      admissionDate: data.admissionDate.slice(0, 10),
      isActive: data.isActive,
    };

    this.loading = false;
  }

  /** Mapeia EmployeeForm → Partial<Employee> garantindo undefined no departmentId */
  private mapFormToEmployee(form: EmployeeForm) {
    return {
      ...form,
      departmentId: form.departmentId ?? undefined,
    };
  }

  onSubmit(): void {
    if (!this.employee) return;

    // Validação obrigatória
    if (!this.employee.name || !this.employee.cpf || !this.employee.email || !this.employee.position) {
      this.errors = ['Por favor, preencha todos os campos obrigatórios.'];
      return;
    }

    const updated = this.employeeService.updateEmployee(
      this.employee.id,
      this.mapFormToEmployee(this.employee)
    );

    if (updated) {
      console.log('Funcionário atualizado com sucesso!');
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
