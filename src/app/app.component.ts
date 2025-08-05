// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for router-outlet
import { LayoutComponent } from './components/layout/layout.component'; // Import LayoutComponent (now standalone)

@Component({
  selector: 'app-root',
  standalone: true, // Marcado como standalone
  imports: [CommonModule, RouterModule, LayoutComponent], // Importa CommonModule, RouterModule e LayoutComponent
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'], // Removido se não houver estilos específicos aqui
})
export class AppComponent {
  title = 'employee-management';
}
