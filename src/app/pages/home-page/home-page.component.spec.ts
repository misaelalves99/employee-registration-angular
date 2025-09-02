// src/app/pages/home-page/home-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home-page.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, CommonModule, RouterModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Bem-vindo ao Sistema de Funcionários');
  });

  it('should render the description paragraph correctly', () => {
    const p = fixture.debugElement.query(By.css('p.description')).nativeElement;
    expect(p.textContent).toContain(
      'Este sistema permite o cadastro, edição e gerenciamento de funcionários da empresa'
    );
  });

  it('should have a routerLink to /employee', () => {
    const link = fixture.debugElement.query(By.css('a.btnPrimary')).nativeElement;
    expect(link.getAttribute('routerLink')).toBe('/employee');
    expect(link.textContent).toContain('Ver Funcionários');
  });
});
