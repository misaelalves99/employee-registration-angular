// app/components/employee/employee-edit-form/employee-edit-form.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Department } from '../../../types/department.model';
import { POSITIONS, Position } from '../../../types/position.model';

@Component({
  selector: 'app-employee-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit-form.component.html',
  styleUrls: ['./employee-edit-form.component.css'],
})
export class EmployeeEditFormComponent implements OnInit {
  @Input() employee!: {
    id: number;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    address: string;
    position: Position;
    departmentId: number;
    salary: number;
    admissionDate: string;
  };

  @Input() departments: Department[] = [];
  @Output() update = new EventEmitter<FormData>();

  form!: FormGroup;
  positions = POSITIONS;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.employee.name, Validators.required],
      cpf: [this.employee.cpf, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      phone: [this.employee.phone],
      address: [this.employee.address],
      position: [this.employee.position, Validators.required],
      departmentId: [String(this.employee.departmentId), Validators.required],
      salary: [String(this.employee.salary), [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      admissionDate: [this.employee.admissionDate.slice(0, 10), Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, String(value ?? ''));
    });

    this.update.emit(formData);
  }

  getError(field: string): string | null {
    const control = this.form.get(field);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'Campo obrigatório.';
      if (control.errors?.['email']) return 'Email inválido.';
      if (control.errors?.['pattern']) return 'Valor inválido.';
    }
    return null;
  }
}
