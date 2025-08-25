// src/app/app.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LayoutComponent], // Como são standalone, import direto
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "employee-management"', () => {
    expect(component.title).toBe('employee-management');
  });

  it('should render LayoutComponent inside AppComponent', () => {
    const layoutEl = fixture.debugElement.query(By.directive(LayoutComponent));
    expect(layoutEl).toBeTruthy();
  });

});
