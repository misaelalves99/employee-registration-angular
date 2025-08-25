// app/components/global-error/global-error.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalErrorComponent } from './global-error.component';
import { By } from '@angular/platform-browser';

describe('GlobalErrorComponent', () => {
  let component: GlobalErrorComponent;
  let fixture: ComponentFixture<GlobalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalErrorComponent], // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar console.error se error for definido', () => {
    const error = new Error('Teste de erro');
    component.error = error;
    const consoleSpy = spyOn(console, 'error');
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });

  it('deve chamar reset ao clicar no botão "Tentar Novamente"', () => {
    const resetSpy = jasmine.createSpy('reset');
    component.reset = resetSpy;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(resetSpy).toHaveBeenCalled();
  });
});
