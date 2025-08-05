// app/components/employee/employee-toggle-status-button/employee-toggle-status-button.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-toggle-status-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-toggle-status-button.component.html',
  styleUrls: ['./employee-toggle-status-button.component.css'],
})
export class EmployeeToggleStatusButtonComponent {
  @Input() employeeId!: number;
  @Input() isActive!: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  loading = false;

  constructor(private http: HttpClient) {}

  handleToggle(): void {
    this.loading = true;

    const endpoint = this.isActive
      ? `/api/employee/inactivate/${this.employeeId}`
      : `/api/employee/reactivate/${this.employeeId}`;

    this.http.post(endpoint, {}).subscribe({
      next: () => {
        this.onToggle.emit(!this.isActive);
        this.loading = false;
      },
      error: () => {
        alert('Erro ao atualizar status.');
        this.loading = false;
      },
    });
  }
}
