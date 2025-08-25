// src/app/pages/privacy-page/privacy-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPageComponent } from './privacy-page.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivacyPageComponent', () => {
  let component: PrivacyPageComponent;
  let fixture: ComponentFixture<PrivacyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPageComponent, CommonModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PrivacyPageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Política de Privacidade');
  });

  it('should render the description paragraph', () => {
    const p = fixture.debugElement.query(By.css('p.description')).nativeElement;
    expect(p.textContent).toContain('Sua privacidade é importante para nós');
  });
});
