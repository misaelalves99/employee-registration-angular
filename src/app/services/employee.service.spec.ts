import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../types/employee.model';
import { Department } from '../types/department.model';
import { Position } from '../types/position.model';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ==========================
  // EMPLOYEES
  // ==========================
  it('should return all employees', () => {
    const employees = service.getAllEmployees();
    expect(employees.length).toBeGreaterThan(0);
  });

  it('should return an employee by ID', () => {
    const emp = service.getAllEmployees()[0];
    const found = service.getEmployeeById(emp.id);
    expect(found).toEqual(emp);
  });

  it('should return null if employee ID does not exist', () => {
    const found = service.getEmployeeById(999999);
    expect(found).toBeNull();
  });

  it('should create a new employee', () => {
    const newEmpData: Partial<Employee> = {
      name: 'Teste Novo',
      cpf: '111.222.333-44',
      email: 'teste@novo.com',
      position: 'Estagiário',
      departmentId: 1,
      salary: 2000,
    };

    const newEmp = service.createEmployee(newEmpData);

    // Verifica se o funcionário foi criado
    expect(newEmp.id).toBeDefined();
    expect(newEmp.name).toBe(newEmpData.name!);
    expect(newEmp.position).toBe(newEmpData.position!);
    expect(newEmp.isActive).toBeTrue();

    // Verifica se ele está na lista de funcionários
    const found = service.getAllEmployees().find(e => e.id === newEmp.id);
    expect(found).toEqual(newEmp);
  });

  it('should update an existing employee', () => {
    const emp = service.getAllEmployees()[0];
    const success = service.updateEmployee(emp.id, { name: 'Updated Name' });
    expect(success).toBeTrue();
    const updatedEmp = service.getEmployeeById(emp.id);
    expect(updatedEmp?.name).toBe('Updated Name');
  });

  it('should fail to update a non-existing employee', () => {
    const success = service.updateEmployee(999999, { name: 'Non-existing' });
    expect(success).toBeFalse();
  });

  it('should delete an employee', () => {
    const emp = service.getAllEmployees()[0];
    const success = service.deleteEmployee(emp.id);
    expect(success).toBeTrue();
    expect(service.getEmployeeById(emp.id)).toBeNull();
  });

  it('should fail to delete a non-existing employee', () => {
    const success = service.deleteEmployee(999999);
    expect(success).toBeFalse();
  });

  // ==========================
  // DEPARTMENTS
  // ==========================
  it('should return all departments', () => {
    const depts: Department[] = service.getAllDepartments();
    expect(depts.length).toBeGreaterThan(0);
  });

  it('should return a department by ID', () => {
    const dept = service.getAllDepartments()[0];
    expect(service.getDepartmentById(dept.id)).toEqual(dept);
  });

  it('should return undefined if department ID does not exist', () => {
    expect(service.getDepartmentById(999999)).toBeUndefined();
  });

  // ==========================
  // POSITIONS
  // ==========================
  it('should return all positions', () => {
    const positions: Position[] = service.getAllPositions();
    expect(positions.length).toBeGreaterThan(0);
  });

  it('should add a new position if it does not exist', () => {
    const newPos: Position = 'Novo Cargo';
    service.addPosition(newPos);
    const positions = service.getAllPositions();
    expect(positions).toContain(newPos);
  });

  it('should not add duplicate positions', () => {
    const existingPos = service.getAllPositions()[0];
    service.addPosition(existingPos);
    const positions = service.getAllPositions().filter(p => p === existingPos);
    expect(positions.length).toBe(1);
  });
});