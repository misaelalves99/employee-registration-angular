// app/components/employee/filter-panel/filter-panel.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import necessário para ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // IMPORTANTE: adicionar FormsModule
})
export class FilterPanelComponent {
  position: string = '';
  departmentId: string = '';

  @Output() onFilterChange = new EventEmitter<{ position?: string; departmentId?: number }>();

  handleFilter() {
    this.onFilterChange.emit({
      position: this.position || undefined,
      departmentId: this.departmentId ? Number(this.departmentId) : undefined,
    });
  }
}
