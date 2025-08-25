// src/app/components/footer/footer.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent], // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o ano atual correto', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('deve renderizar o ano atual no template', () => {
    const p: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    const currentYear = new Date().getFullYear();
    expect(p.textContent).toContain(currentYear.toString());
  });
});
