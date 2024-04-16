import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  template: `<router-outlet></router-outlet>`,
  styleUrl: '../assets/styles/components/app.sass',
})
export class AppComponent {
  title = 'angular';
}
