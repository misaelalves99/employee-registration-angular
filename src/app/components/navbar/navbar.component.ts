// src/app/components/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass

@Component({
  selector: 'app-navbar',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, RouterModule], // Adicionado CommonModule e RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  get currentPath(): string {
    return this.router.url;
  }
}
