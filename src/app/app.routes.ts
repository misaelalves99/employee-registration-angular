// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home-page/home-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { CreatePageComponent } from './pages/employee-page/create-page/create-page.component';
import { EditPageComponent } from './pages/employee-page/edit-page/edit-page.component';
import { DeleteComponent } from './pages/employee-page/delete-page/delete-page.component';
import { ReactivateComponent } from './pages/employee-page/reactivate-page/reactivate-page.component';
import { EmployeeDetailsComponent } from './pages/employee-page/details-page/details-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import { NotFoundComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'funcionarios', component: EmployeePageComponent },
  { path: 'funcionarios/cadastrar', component: CreatePageComponent },
  { path: 'funcionarios/editar/:id', component: EditPageComponent },
  { path: 'funcionarios/excluir/:id', component: DeleteComponent },
  { path: 'funcionarios/reativar/:id', component: ReactivateComponent },
  { path: 'funcionarios/detalhes/:id', component: EmployeeDetailsComponent },
  { path: 'privacidade', component: PrivacyPageComponent },
  { path: '**', component: NotFoundComponent },
];
