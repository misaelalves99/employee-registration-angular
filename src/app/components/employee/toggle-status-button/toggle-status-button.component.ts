// app/components/employee/toggle-status-button/toggle-status-button.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-status-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-status-button.component.html',
  styleUrls: ['./toggle-status-button.component.css'],
})
export class ToggleStatusButtonComponent {
  @Input() employeeId!: number;
  @Input() initialStatus: boolean = false;
  @Output() onStatusChange = new EventEmitter<boolean>();

  isActive: boolean = false;
  loading: boolean = false;

  ngOnInit() {
    this.isActive = this.initialStatus;
  }

  async toggleStatus() {
    this.loading = true;
    try {
      const res = await fetch(`/api/employees/${this.employeeId}/toggle-status`, {
        method: 'POST',
      });
      this.loading = false;

      if (res.ok) {
        const data = await res.json();
        this.isActive = data.isActive;
        this.onStatusChange.emit(data.isActive);
      } else {
        alert('Erro ao alterar status');
      }
    } catch {
      this.loading = false;
      alert('Erro ao alterar status');
    }
  }
}
