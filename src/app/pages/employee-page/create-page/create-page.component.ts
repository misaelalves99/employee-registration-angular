// src/app/pages/employee-page/create-page/create-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Department } from '../../../types/department.model';
import { Position } from '../../../types/position.model';
import { createMockEmployee } from '../../../mock/employees.mock';
import { getMockDepartments } from '../../../mock/departments.mock';
import { getMockPositions } from '../../../mock/positions.mock';

@Component({
  selector: 'app-create-employee-page',
  standalone: true, // <-- MARCADO COMO STANDALONE
  imports: [CommonModule, FormsModule], // <-- IMPORTA SEUS PRÓPRIOS MÓDULOS
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  departments: Department[] = [];
  positions: Position[] = [];
  loading = true;

  formData = {
    name: '',
    cpf: '',
    salary: '',
    isActive: true,
    departmentId: '',
    position: '' as Position,
  };

  constructor(private router: Router) {}

  async ngOnInit() {
    const [deps, pos] = await Promise.all([
      getMockDepartments(),
      getMockPositions(),
    ]);
    this.departments = deps;
    this.positions = pos;
    this.loading = false;
  }

  async handleSubmit() {
    // Basic validation for demonstration, consider using Reactive Forms for robust validation
    if (!this.formData.name || !this.formData.cpf || !this.formData.salary || !this.formData.departmentId || !this.formData.position) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    await createMockEmployee({
      id: Date.now(), // Generate a unique ID
      name: this.formData.name,
      cpf: this.formData.cpf,
      salary: parseFloat(this.formData.salary),
      position: this.formData.position,
      departmentId: parseInt(this.formData.departmentId),
      department: this.departments.find(
        (d) => d.id === parseInt(this.formData.departmentId)
      ),
      email: 'default@example.com', // Add default or collect from form
      admissionDate: new Date().toISOString(),
      isActive: this.formData.isActive,
    });
    alert('Funcionário criado com sucesso!');
    this.router.navigate(['/funcionarios']); // Navigate to the employees list page
  }
}
