// src/app/pages/home-page/home-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas comuns como *ngIf, *ngFor (se usado)
import { RouterModule } from '@angular/router'; // Necessário para routerLink (se usado)

@Component({
  selector: 'app-home',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, RouterModule], // Importa CommonModule e RouterModule
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomeComponent {}
