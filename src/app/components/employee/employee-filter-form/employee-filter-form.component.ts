// app/components/employee/employee-filter-form/employee-filter-form.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filters } from '../../../types/filters.model';
import { POSITIONS } from '../../../types/position.model';

@Component({
  selector: 'app-employee-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-filter-form.component.html',
  styleUrls: ['./employee-filter-form.component.css'], // Certifique-se de que o arquivo .css existe neste caminho
})
export class EmployeeFilterFormComponent {
  @Input() filters: Filters = {
    departmentId: '',
    position: '',
    isActive: '',
    admissionDateFrom: '',
    admissionDateTo: ''
  };

  @Output() filtersChange = new EventEmitter<Filters>();

  positions = POSITIONS;

  onChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    this.filtersChange.emit({
      ...this.filters,
      [name]: value,
    });
  }
}
