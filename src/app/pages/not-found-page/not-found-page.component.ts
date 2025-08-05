// src/app/pages/not-found-page/not-found-page.component.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngIf (if used)

@Component({
  selector: 'app-not-found',
  standalone: true, // Já está marcado como standalone
  imports: [CommonModule, RouterModule], // Adicionado CommonModule e RouterModule
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Redireciona para a rota raiz, que é HomeComponent
  }
}
