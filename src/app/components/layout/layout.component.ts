// src/app/layout/layout.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for <router-outlet>
import { NavbarComponent } from '../navbar/navbar.component'; // Import NavbarComponent (now standalone)
import { FooterComponent } from '../footer/footer.component'; // Import FooterComponent (now standalone)

@Component({
  selector: 'app-layout',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent], // Adicionado CommonModule, RouterModule, NavbarComponent, FooterComponent
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {}
