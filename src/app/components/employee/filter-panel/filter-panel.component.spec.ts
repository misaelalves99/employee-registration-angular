// src/app/components/employee/filter-panel/filter-panel.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPanelComponent } from './filter-panel.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FilterPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar os valores de position e departmentId via ngModel', () => {
    const positionInput = fixture.debugElement.query(By.css('#position')).nativeElement as HTMLInputElement;
    const departmentInput = fixture.debugElement.query(By.css('#departmentId')).nativeElement as HTMLInputElement;

    positionInput.value = 'Desenvolvedor';
    positionInput.dispatchEvent(new Event('input'));

    departmentInput.value = '3';
    departmentInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.position).toBe('Desenvolvedor');
    expect(component.departmentId).toBe('3');
  });

  it('deve emitir evento onFilterChange com os valores corretos', () => {
    spyOn(component.onFilterChange, 'emit');

    component.position = 'Gerente';
    component.departmentId = '2';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onFilterChange.emit).toHaveBeenCalledWith({
      position: 'Gerente',
      departmentId: 2,
    });
  });

  it('deve emitir evento onFilterChange com undefined quando campos vazios', () => {
    spyOn(component.onFilterChange, 'emit');

    component.position = '';
    component.departmentId = '';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onFilterChange.emit).toHaveBeenCalledWith({
      position: undefined,
      departmentId: undefined,
    });
  });

  it('deve converter corretamente departmentId para número mesmo com string numérica', () => {
    spyOn(component.onFilterChange, 'emit');

    component.departmentId = '5';
    fixture.detectChanges();

    component.handleFilter();

    expect(component.onFilterChange.emit).toHaveBeenCalledWith({
      position: undefined,
      departmentId: 5,
    });
  });

  it('deve permitir múltiplos cliques consecutivos', () => {
    spyOn(component.onFilterChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    component.position = 'Analista';
    component.departmentId = '1';
    fixture.detectChanges();

    button.triggerEventHandler('click', null);
    button.triggerEventHandler('click', null);

    expect(component.onFilterChange.emit).toHaveBeenCalledTimes(2);
    expect(component.onFilterChange.emit).toHaveBeenCalledWith({
      position: 'Analista',
      departmentId: 1,
    });
  });
});
