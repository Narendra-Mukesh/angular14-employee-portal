import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
@Component({
  selector: 'app-departments',
  template: `
    <div class="page">
      <div class="page-header"><div><h1>Departments</h1><p class="muted">Company teams and reporting structure</p></div></div>
      <div class="department-grid">
        <mat-card *ngFor="let department of departments">
          <div class="dept-icon"><mat-icon>business</mat-icon></div>
          <h2>{{ department.name }}</h2>
          <p class="muted">Manager: {{ department.manager }}</p>
          <p class="muted">Location: {{ department.location }}</p>
          <strong>{{ employeeCount(department.id) }} employees</strong>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .department-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
    .dept-icon { width:42px; height:42px; display:grid; place-items:center; background:#e6eef8; color:#243b53; border-radius:10px; }
    h2 { font-size:18px; margin-bottom:8px; }
  `]
})
export class DepartmentsComponent {
  departments = this.data.getDepartments();
  employees = this.data.getEmployees();
  employeeList: any[] = [];
  constructor(private data: DataService) { this.employees.subscribe(items => this.employeeList = items); }
  employeeCount(id: number): number { return this.employeeList.filter(item => item.departmentId === id).length; }
}
