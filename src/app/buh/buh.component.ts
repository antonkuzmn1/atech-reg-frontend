import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '../common/session.service';

@Component({
  selector: 'app-buh',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <section>
      <a routerLink="/buh/auth" routerLinkActive="active">Авторизация</a>
      <a routerLink="/buh/main" routerLinkActive="active">Основной реестр</a>
      <a routerLink="/buh/all" routerLinkActive="active">Пользовательский реестр</a>
      <a *ngIf="allow()" routerLink="/buh/import" routerLinkActive="active">Импорт из 1С</a>
    </section>
    <router-outlet></router-outlet>
  `,
  styleUrl: '../../assets/styles/components/buh.sass',
})
export class BuhComponent implements OnInit {
  constructor(private session: SessionService) { }

  ngOnInit(): void { this.session.get() }
  allow(): boolean { return this.session.allow([2]) }
}
