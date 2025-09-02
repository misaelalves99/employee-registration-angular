// src/app/components/navbar/navbar.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let location: Location;

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
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('currentPath deve retornar a URL atual', waitForAsync(async () => {
    await router.navigate(['/funcionarios']);
    fixture.detectChanges();
    expect(component.currentPath).toBe('/funcionarios');

    await router.navigate(['/privacidade']);
    fixture.detectChanges();
    expect(component.currentPath).toBe('/privacidade');
  }));

  it('deve aplicar a classe activeLink ao link correto', waitForAsync(async () => {
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/"]')).nativeElement as HTMLAnchorElement;
    const funcionariosLink = fixture.debugElement.query(By.css('a[routerLink="/funcionarios"]')).nativeElement as HTMLAnchorElement;
    const privacidadeLink = fixture.debugElement.query(By.css('a[routerLink="/privacidade"]')).nativeElement as HTMLAnchorElement;

    await router.navigate(['/']);
    fixture.detectChanges();
    expect(homeLink.classList).toContain('activeLink');
    expect(funcionariosLink.classList).not.toContain('activeLink');
    expect(privacidadeLink.classList).not.toContain('activeLink');

    await router.navigate(['/funcionarios']);
    fixture.detectChanges();
    expect(homeLink.classList).not.toContain('activeLink');
    expect(funcionariosLink.classList).toContain('activeLink');
    expect(privacidadeLink.classList).not.toContain('activeLink');

    await router.navigate(['/privacidade']);
    fixture.detectChanges();
    expect(homeLink.classList).not.toContain('activeLink');
    expect(funcionariosLink.classList).not.toContain('activeLink');
    expect(privacidadeLink.classList).toContain('activeLink');
  }));

  it('deve manter activeLink mesmo em subrotas de /funcionarios', waitForAsync(async () => {
    const funcionariosLink = fixture.debugElement.query(By.css('a[routerLink="/funcionarios"]')).nativeElement as HTMLAnchorElement;

    await router.navigate(['/funcionarios/edit']);
    fixture.detectChanges();
    expect(funcionariosLink.classList).toContain('activeLink');
  }));
});
