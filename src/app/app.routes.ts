import { Routes } from '@angular/router';
import { BuhAllComponent } from './buh/buh-all/buh-all.component';
import { BuhAuthComponent } from './buh/buh-auth/buh-auth.component';
import { BuhImportComponent } from './buh/buh-import/buh-import.component';
import { BuhMainComponent } from './buh/buh-main/buh-main.component';
import { BuhComponent } from './buh/buh.component';

export const routes: Routes = [
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
  { path: '', redirectTo: 'buh/main', pathMatch: 'full' },
  { path: '**', redirectTo: 'buh/main', pathMatch: 'full' },
];
