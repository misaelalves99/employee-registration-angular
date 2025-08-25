import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to HomeComponent for "" path', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('');
  });

  it('should navigate to EmployeePageComponent for "funcionarios" path', async () => {
    await router.navigate(['/funcionarios']);
    expect(location.path()).toBe('/funcionarios');
  });

  it('should navigate to CreatePageComponent for "funcionarios/cadastrar"', async () => {
    await router.navigate(['/funcionarios/cadastrar']);
    expect(location.path()).toBe('/funcionarios/cadastrar');
  });

  it('should navigate to EditComponent for "funcionarios/editar/:id"', async () => {
    await router.navigate(['/funcionarios/editar/1']);
    expect(location.path()).toBe('/funcionarios/editar/1');
  });

  it('should navigate to DeleteComponent for "funcionarios/excluir/:id"', async () => {
    await router.navigate(['/funcionarios/excluir/1']);
    expect(location.path()).toBe('/funcionarios/excluir/1');
  });

  it('should navigate to ReactivateComponent for "funcionarios/reativar/:id"', async () => {
    await router.navigate(['/funcionarios/reativar/1']);
    expect(location.path()).toBe('/funcionarios/reativar/1');
  });

  it('should navigate to EmployeeDetailsComponent for "funcionarios/detalhes/:id"', async () => {
    await router.navigate(['/funcionarios/detalhes/1']);
    expect(location.path()).toBe('/funcionarios/detalhes/1');
  });

  it('should navigate to PrivacyPageComponent for "privacidade"', async () => {
    await router.navigate(['/privacidade']);
    expect(location.path()).toBe('/privacidade');
  });

  it('should navigate to NotFoundComponent for unknown path', async () => {
    await router.navigate(['/unknown']);
    expect(location.path()).toBe('/unknown');
  });
});
