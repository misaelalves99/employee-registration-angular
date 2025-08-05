// src/app/components/employee/employee-filter/employee-filter.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { POSITIONS, Position } from '../../../types/position.model';

@Component({
  selector: 'app-employee-filter',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, ReactiveFormsModule], // Adicionado CommonModule e ReactiveFormsModule
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.scss'],
})
export class EmployeeFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<{
    search?: string;
    departmentId?: number;
    position?: Position | '';
    isActive?: boolean;
    admissionDateFrom?: string;
    admissionDateTo?: string;
  }>();

  filterForm!: FormGroup;
  positions = POSITIONS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      departmentId: [''],
      position: [''],
      isActive: [''],
      admissionDateFrom: [''],
      admissionDateTo: [''],
    });
  }

  onSubmit(): void {
    const { search, departmentId, position, isActive, admissionDateFrom, admissionDateTo } =
      this.filterForm.value;

    this.filterChange.emit({
      search: search || undefined,
      departmentId: departmentId ? +departmentId : undefined,
      position: position || undefined,
      isActive:
        isActive === '' ? undefined : isActive === 'true' ? true : false,
      admissionDateFrom: admissionDateFrom || undefined,
      admissionDateTo: admissionDateTo || undefined,
    });
  }

  onReset(): void {
    this.filterForm.reset();
    this.filterChange.emit({}); // Emitir filtros vazios para limpar os resultados
  }
}
