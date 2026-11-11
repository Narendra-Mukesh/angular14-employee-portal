import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-list',
  template: `
    <div class="page">
      <div class="page-header"><div><h1>Employees</h1><p class="muted">Manage your people and their details</p></div>
        <button mat-raised-button color="primary" (click)="router.navigate(['/employees/new'])"><mat-icon>add</mat-icon> Add employee</button>
      </div>
      <mat-card>
        <div class="filters">
          <mat-form-field appearance="outline"><mat-label>Search employees</mat-label><input matInput [(ngModel)]="search" placeholder="Name, email or role"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Department</mat-label>
            <mat-select [(ngModel)]="departmentFilter"><mat-option value="">All departments</mat-option>
              <mat-option *ngFor="let department of departments" [value]="department.id">{{ department.name }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="table-card">
          <table mat-table [dataSource]="filteredEmployees">
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Employee</th><td mat-cell *matCellDef="let item"><strong>{{ item.firstName }} {{ item.lastName }}</strong><div class="muted">{{ item.email }}</div></td></ng-container>
            <ng-container matColumnDef="department"><th mat-header-cell *matHeaderCellDef>Department</th><td mat-cell *matCellDef="let item">{{ departmentName(item.departmentId) }}</td></ng-container>
            <ng-container matColumnDef="designation"><th mat-header-cell *matHeaderCellDef>Designation</th><td mat-cell *matCellDef="let item">{{ item.designation }}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let item"><span class="status" [class.active]="item.status === 'Active'" [class.inactive]="item.status === 'Inactive'">{{ item.status }}</span></td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let item">
              <button mat-icon-button color="primary" (click)="edit(item.id)" aria-label="Edit employee"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn" (click)="remove(item)" aria-label="Delete employee"><mat-icon>delete</mat-icon></button>
            </td></ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr><tr mat-row *matRowDef="let row; columns: columns"></tr>
          </table>
          <p class="empty muted" *ngIf="filteredEmployees.length === 0">No employees match your search.</p>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .filters { display: flex; gap: 16px; flex-wrap: wrap; padding-top: 14px; }
    .filters mat-form-field:first-child { flex: 1; min-width: 220px; }
    .filters mat-form-field:last-child { width: 220px; }
    table { width: 100%; }
    .empty { text-align: center; padding: 24px; }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments = this.data.getDepartments();
  search = '';
  departmentFilter = '';
  columns = ['name', 'department', 'designation', 'status', 'actions'];

  constructor(private data: DataService, public router: Router) {}
  ngOnInit(): void { this.data.getEmployees().subscribe(items => this.employees = items); }
  get filteredEmployees(): Employee[] {
    const query = this.search.toLowerCase().trim();
    return this.employees.filter(item => {
      const matchesText = `${item.firstName} ${item.lastName} ${item.email} ${item.designation}`.toLowerCase().includes(query);
      const matchesDepartment = !this.departmentFilter || item.departmentId === Number(this.departmentFilter);
      return matchesText && matchesDepartment;
    });
  }
  departmentName(id: number): string { return this.departments.find(item => item.id === id)?.name || 'Unknown'; }
  edit(id: number): void { this.router.navigate(['/employees', id, 'edit']); }
  remove(employee: Employee): void {
    if (confirm(`Delete ${employee.firstName} ${employee.lastName}?`)) this.data.deleteEmployee(employee.id);
  }
}
