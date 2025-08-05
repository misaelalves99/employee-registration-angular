// src/app/pages/employee-page/delete-page/delete-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../types/employee.model';
import { getMockEmployees, deleteMockEmployee } from '../../../mock/mock-data.util';

@Component({
  selector: 'app-employee-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeleteComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const employees = getMockEmployees();
    const found = employees.find(emp => emp.id === id);

    if (!found) {
      this.error = 'Funcionário não encontrado.';
    } else {
      this.employee = found;
    }

    this.loading = false;
  }

  handleDelete(): void {
    if (!this.employee) return;

    const confirmed = confirm(`Tem certeza que deseja deletar o funcionário ${this.employee.name}?`);
    if (!confirmed) return;

    try {
      deleteMockEmployee(this.employee.id);
      alert('Funcionário deletado com sucesso!');
      this.router.navigate(['/funcionarios']);
    } catch (err) {
      console.error('Erro ao deletar funcionário:', err); // Adicionado prefixo para clareza
      this.error = 'Erro ao deletar funcionário. Tente novamente.'; // Mensagem de erro mais amigável
    }
  }

  handleCancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
