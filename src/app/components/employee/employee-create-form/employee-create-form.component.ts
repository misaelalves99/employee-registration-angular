// src/app/components/employee/employee-create-form/employee-create-form.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { POSITIONS } from '../../../types/position.model';
import { CommonModule } from '@angular/common';

interface EmployeeFormValue {
  name: string;
  cpf: string;
  email: string;
  phone?: string;
  address?: string;
  position: string;
  departmentId: string;
  salary: string | number;
  admissionDate: string;
}

@Component({
  selector: 'app-employee-create-form',
  standalone: true,
  templateUrl: './employee-create-form.component.html',
  styleUrls: ['./employee-create-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmployeeCreateFormComponent implements OnInit {
  @Input() departments: Department[] = [];
  @Input() onCreate!: (data: FormData) => Promise<void>;

  form!: FormGroup;
  errors: Record<string, string> = {};
  readonly POSITIONS = POSITIONS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      position: ['', Validators.required],
      departmentId: [null, Validators.required], // agora number
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      admissionDate: ['', Validators.required],
    });
  }

  async handleSubmit(): Promise<void> {
    this.errors = {};

    const value: EmployeeFormValue = this.form.value;

    if (!value['name']) this.errors['name'] = 'Nome é obrigatório.';
    if (!value['cpf']) this.errors['cpf'] = 'CPF é obrigatório.';
    if (!value['email']) this.errors['email'] = 'Email é obrigatório.';
    if (!value['position']) this.errors['position'] = 'Cargo é obrigatório.';
    if (!value['departmentId']) this.errors['departmentId'] = 'Departamento é obrigatório.';
    if (!value['salary'] || isNaN(Number(value['salary']))) this.errors['salary'] = 'Salário inválido.';
    if (!value['admissionDate']) this.errors['admissionDate'] = 'Data de admissão é obrigatória.';

    if (Object.keys(this.errors).length > 0) return;

    const formData = new FormData();
    Object.entries(value).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, String(val));
      }
    });

    await this.onCreate(formData);
    this.form.reset();
  }
}
