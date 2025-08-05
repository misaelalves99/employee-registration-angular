// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Componentes funcionais (standalone components são importados, não declarados aqui)
import { EmployeeCreateFormComponent } from './components/employee/employee-create-form/employee-create-form.component';
import { EmployeeFilterComponent } from './components/employee/employee-filter/employee-filter.component';
import { EmployeeDeleteModalComponent } from './components/employee/employee-delete-modal/employee-delete-modal.component';
import { EmployeeFilterFormComponent } from './components/employee/employee-filter-form/employee-filter-form.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { ModalComponent } from './components/modal/modal.component';


// Páginas (standalone components são importados, não declarados aqui)
import { HomeComponent } from './pages/home-page/home-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { CreatePageComponent } from './pages/employee-page/create-page/create-page.component';
import { EditComponent } from './pages/employee-page/edit-page/edit-page.component';
import { DeleteComponent } from './pages/employee-page/delete-page/delete-page.component';
import { ReactivateComponent } from './pages/employee-page/reactivate-page/reactivate-page.component';
import { EmployeeDetailsComponent } from './pages/employee-page/details-page/details-page.component';
import { NotFoundComponent } from './pages/not-found-page/not-found-page.component';

// Rotas
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // REMOVIDO: CreatePageComponent (agora é standalone e importado)
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Configura as rotas principais

    // Importa todos os componentes standalone
    EmployeeCreateFormComponent,
    EmployeeDetailsComponent,
    EditComponent,
    DeleteComponent,
    ReactivateComponent,
    EmployeePageComponent,
    HomeComponent,
    PrivacyPageComponent,
    NotFoundComponent,
    EmployeeDeleteModalComponent,
    EmployeeFilterComponent,
    EmployeeFilterFormComponent,
    GlobalErrorComponent,
    ModalComponent,
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
    CreatePageComponent,
  ],
  // AppComponent agora é standalone, então não é bootstrapped por um NgModule
  // bootstrap: [AppComponent],
})
export class AppModule {}
