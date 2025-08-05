// src/app/components/footer/footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives if needed

@Component({
  selector: 'app-footer',
  standalone: true, // Marcado como standalone
  imports: [CommonModule], // Adicionado CommonModule
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
