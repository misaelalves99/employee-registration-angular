// app/components/employee/employee-form/employee-form.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { EmployeeFormData } from '../../../types/employee-form-data.model';
import { POSITIONS, Position } from '../../../types/position.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  @Input() departments: Department[] = [];
  @Output() formSubmitted = new EventEmitter<EmployeeFormData>();

  formData: EmployeeFormData = {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    position: '' as Position,
    departmentId: '',
    salary: '',
    admissionDate: '',
    isActive: true,
  };

  errors: Partial<Record<keyof EmployeeFormData, string>> = {};
  positions = POSITIONS;

  handleCheckboxChange() {
    this.formData.isActive = !this.formData.isActive;
  }

  validate(): boolean {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};
    const f = this.formData;

    if (!f.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!f.cpf.trim()) newErrors.cpf = 'CPF é obrigatório.';
    if (!f.email.trim()) newErrors.email = 'Email é obrigatório.';
    if (!f.phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
    if (!f.address.trim()) newErrors.address = 'Endereço é obrigatório.';
    if (!f.position) newErrors.position = 'Cargo é obrigatório.';
    if (!f.departmentId) newErrors.departmentId = 'Departamento é obrigatório.';

    if (f.salary === '') {
      newErrors.salary = 'Salário é obrigatório.';
    } else if (isNaN(Number(f.salary)) || Number(f.salary) < 0) {
      newErrors.salary = 'Salário deve ser um número positivo.';
    }

    if (!f.admissionDate) newErrors.admissionDate = 'Data de admissão é obrigatória.';

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(): void {
    if (this.validate()) {
      this.formSubmitted.emit({
        ...this.formData,
        salary: this.formData.salary.toString().trim(),
      });
    }
  }
}
