// src/app/pages/not-found-page/not-found-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found-page.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, CommonModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the NotFoundComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the 404 title', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Erro 404');
  });

  it('should render the description paragraph', () => {
    const p = fixture.debugElement.query(By.css('p.description')).nativeElement;
    expect(p.textContent).toContain('A página que você está procurando não foi encontrada.');
  });

  it('should navigate to home when goHome() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to home when the button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('button.home-button'));
    button.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
