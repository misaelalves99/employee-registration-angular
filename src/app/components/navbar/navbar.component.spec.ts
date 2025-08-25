// src/app/components/navbar/navbar.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: class DummyComponent {} },
          { path: 'funcionarios', component: class DummyComponent {} },
          { path: 'privacidade', component: class DummyComponent {} },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('currentPath deve retornar a URL atual', () => {
    router.navigate(['/funcionarios']);
    fixture.detectChanges();
    expect(component.currentPath).toBe('/funcionarios');
  });

  it('deve aplicar a classe activeLink ao link correto', async () => {
    await router.navigate(['/']);
    fixture.detectChanges();
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/"]')).nativeElement;
    const funcionariosLink = fixture.debugElement.query(By.css('a[routerLink="/funcionarios"]')).nativeElement;
    const privacidadeLink = fixture.debugElement.query(By.css('a[routerLink="/privacidade"]')).nativeElement;

    expect(homeLink.classList).toContain('activeLink');
    expect(funcionariosLink.classList).not.toContain('activeLink');
    expect(privacidadeLink.classList).not.toContain('activeLink');

    await router.navigate(['/funcionarios']);
    fixture.detectChanges();
    expect(funcionariosLink.classList).toContain('activeLink');
  });
});
