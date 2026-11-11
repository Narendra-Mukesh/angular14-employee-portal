import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { LeaveRequest } from '../models/leave-request.model';

const EMPLOYEES_KEY = 'peoplehub.employees';
const LEAVES_KEY = 'peoplehub.leaves';

const seedEmployees: Employee[] = [
  { id: 1, firstName: 'Ava', lastName: 'Patel', email: 'ava.patel@example.com', phone: '9876501001', departmentId: 1, designation: 'Product Manager', joiningDate: '2021-04-12', status: 'Active' },
  { id: 2, firstName: 'Liam', lastName: 'Chen', email: 'liam.chen@example.com', phone: '9876501002', departmentId: 2, designation: 'Senior Developer', joiningDate: '2020-08-03', status: 'Active' },
  { id: 3, firstName: 'Mia', lastName: 'Sharma', email: 'mia.sharma@example.com', phone: '9876501003', departmentId: 3, designation: 'HR Specialist', joiningDate: '2022-01-17', status: 'Active' },
  { id: 4, firstName: 'Noah', lastName: 'Williams', email: 'noah.williams@example.com', phone: '9876501004', departmentId: 2, designation: 'QA Engineer', joiningDate: '2023-02-06', status: 'Inactive' },
  { id: 5, firstName: 'Isabella', lastName: 'Rao', email: 'isabella.rao@example.com', phone: '9876501005', departmentId: 1, designation: 'Business Analyst', joiningDate: '2019-11-25', status: 'Active' },
  { id: 6, firstName: 'Ethan', lastName: 'Martin', email: 'ethan.martin@example.com', phone: '9876501006', departmentId: 4, designation: 'Finance Analyst', joiningDate: '2021-09-14', status: 'Active' }
];

const seedLeaves: LeaveRequest[] = [
  { id: 1, employeeId: 1, type: 'Annual', startDate: '2026-11-20', endDate: '2026-11-22', reason: 'Family event', status: 'Pending' },
  { id: 2, employeeId: 3, type: 'Sick', startDate: '2026-11-04', endDate: '2026-11-05', reason: 'Not feeling well', status: 'Approved' },
  { id: 3, employeeId: 2, type: 'Personal', startDate: '2026-12-02', endDate: '2026-12-02', reason: 'Personal work', status: 'Pending' }
];

@Injectable({ providedIn: 'root' })
export class DataService {
  private employeesSubject = new BehaviorSubject<Employee[]>(this.load(EMPLOYEES_KEY, seedEmployees));
  private leavesSubject = new BehaviorSubject<LeaveRequest[]>(this.load(LEAVES_KEY, seedLeaves));

  getEmployees(): Observable<Employee[]> { return this.employeesSubject.asObservable(); }
  getLeaves(): Observable<LeaveRequest[]> { return this.leavesSubject.asObservable(); }

  getEmployee(id: number): Employee | undefined {
    return this.employeesSubject.value.find(employee => employee.id === id);
  }

  saveEmployee(employee: Employee): void {
    const current = this.employeesSubject.value;
    const exists = current.some(item => item.id === employee.id);
    const updated = exists
      ? current.map(item => item.id === employee.id ? employee : item)
      : [...current, { ...employee, id: this.nextId(current) }];
    this.updateEmployees(updated);
  }

  deleteEmployee(id: number): void {
    this.updateEmployees(this.employeesSubject.value.filter(employee => employee.id !== id));
  }

  updateLeaveStatus(id: number, status: LeaveRequest['status']): void {
    const updated = this.leavesSubject.value.map(leave => leave.id === id ? { ...leave, status } : leave);
    this.leavesSubject.next(updated);
    localStorage.setItem(LEAVES_KEY, JSON.stringify(updated));
  }

  getDepartments(): Department[] {
    return [
      { id: 1, name: 'Product', manager: 'Olivia Green', location: 'Chennai' },
      { id: 2, name: 'Engineering', manager: 'Daniel Kim', location: 'Bengaluru' },
      { id: 3, name: 'Human Resources', manager: 'Sophia Brown', location: 'Chennai' },
      { id: 4, name: 'Finance', manager: 'James Wilson', location: 'Mumbai' }
    ];
  }

  private updateEmployees(updated: Employee[]): void {
    this.employeesSubject.next(updated);
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(updated));
  }

  private load<T>(key: string, fallback: T): T {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    try { return JSON.parse(stored) as T; } catch { return fallback; }
  }

  private nextId(items: Array<{ id: number }>): number {
    return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }
}
