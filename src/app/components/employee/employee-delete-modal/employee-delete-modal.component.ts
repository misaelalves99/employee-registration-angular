// src/app/components/employee/employee-delete-modal/employee-delete-modal.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { Employee } from '../../../types/employee.model';

@Component({
  selector: 'app-employee-delete-modal',
  standalone: true, // Marcado como standalone
  imports: [CommonModule], // Adicionado CommonModule
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.css'],
})
export class EmployeeDeleteModalComponent {
  @Input() employee: Employee | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  loading = false;

  async handleDelete(): Promise<void> {
    if (!this.employee) return;
    this.loading = true;
    try {
      await this.deleteEmployeeMock(this.employee.id);
      this.deleted.emit();
      this.close.emit();
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      alert('Erro ao deletar funcionário. Tente novamente.');
    } finally {
      this.loading = false;
    }
  }

  private deleteEmployeeMock(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      console.log('Simulando exclusão do funcionário com ID:', id);
      setTimeout(() => resolve(true), 1000);
    });
  }
}
