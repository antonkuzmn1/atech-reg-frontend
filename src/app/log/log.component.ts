import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: 'log.component.html',
  styleUrl: '../../assets/styles/components/log.sass'
})
export class LogComponent {

}
