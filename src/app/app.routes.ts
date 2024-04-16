import { Routes } from '@angular/router';
import { BuhAllComponent } from './buh/buh-all/buh-all.component';
import { BuhAuthComponent } from './buh/buh-auth/buh-auth.component';
import { BuhImportComponent } from './buh/buh-import/buh-import.component';
import { BuhMainComponent } from './buh/buh-main/buh-main.component';
import { BuhComponent } from './buh/buh.component';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'buh',
    component: BuhComponent,
    children: [
      { path: 'auth', component: BuhAuthComponent },
      { path: 'main/:year/:month', component: BuhMainComponent },
      { path: 'all/:year/:month', component: BuhAllComponent },
      { path: 'import', component: BuhImportComponent },
      { path: 'all', redirectTo: 'all/0/0', pathMatch: 'full' },
      { path: 'main', redirectTo: 'main/0/0', pathMatch: 'full' },
    ],
  },
  { path: 'log', component: LogComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
