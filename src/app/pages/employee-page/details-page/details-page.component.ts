// src/app/pages/employee-page/details-page/details-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.notFound = true;
      return;
    }

    this.employee = this.employeeService.getEmployeeById(id);

    if (!this.employee) {
      this.notFound = true;
    }
  }

  formatSalary(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleDateString('pt-BR');
  }
}
