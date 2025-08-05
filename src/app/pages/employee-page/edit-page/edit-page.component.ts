// src/app/pages/employee-page/edit-page/edit-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { EmployeeForm } from '../../../types/employee-form.model';
import { Department } from '../../../types/department.model';
import { POSITIONS } from '../../../types/position.model';
import { getEmployeeById, updateMockEmployee } from '../../../mock/employees.mock';
import { getMockDepartments } from '../../../mock/departments.mock';

@Component({
  selector: 'app-edit-employee-page',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, FormsModule, RouterModule], // Importa CommonModule, FormsModule e RouterModule
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditComponent implements OnInit {
  employee: EmployeeForm | null = null;
  departments: Department[] = [];
  loading = true;
  errors: string[] = [];

  POSITIONS = POSITIONS;

  textFields: (keyof Pick<EmployeeForm, 'name' | 'cpf' | 'email' | 'phone' | 'address'>)[] = [
    'name',
    'cpf',
    'email',
    'phone',
    'address',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = getEmployeeById(id);

    if (!data) {
      this.errors = ['Funcionário não encontrado'];
      this.loading = false;
      return;
    }

    this.employee = {
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      position: data.position,
      departmentId: data.department?.id ?? null,
      salary: data.salary,
      admissionDate: data.admissionDate.slice(0, 10),
      isActive: data.isActive,
    };

    getMockDepartments().then((deps) => {
      this.departments = deps;
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (!this.employee) return;

    const updated = updateMockEmployee(this.employee.id, this.employee);
    if (updated) {
      alert('Funcionário atualizado com sucesso!'); // Feedback ao usuário
      this.router.navigate(['/funcionarios']); // Redirecionar para a lista de funcionários
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
