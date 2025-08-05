// app/components/global-error/global-error.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-global-error',
  standalone: true, // Marcado como standalone
  imports: [CommonModule], // Adicionado CommonModule
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css'],
})
export class GlobalErrorComponent implements OnInit { // Adicionado OnInit para ngOnInit
  @Input() error: Error | null = null;
  @Input() reset: () => void = () => {};

  ngOnInit() {
    if (this.error) {
      console.error(this.error);
    }
  }

  onRetry() {
    this.reset();
  }
}
