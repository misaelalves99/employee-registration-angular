// src/app/pages/privacy-page/privacy-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas comuns como *ngIf, *ngFor (se usado)
import { RouterModule } from '@angular/router'; // Necessário para routerLink (se usado)

@Component({
  selector: 'app-privacy-page',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, RouterModule], // Importa CommonModule e RouterModule
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.css'],
})
export class PrivacyPageComponent {}
