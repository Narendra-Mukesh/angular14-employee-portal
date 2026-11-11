import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Employee } from '../../core/models/employee.model';
import { LeaveRequest } from '../../core/models/leave-request.model';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="page">
      <div class="page-header"><div><h1>Dashboard</h1><p class="muted">Overview of your workforce</p></div></div>
      <div class="stats">
        <mat-card><span class="muted">Total employees</span><strong>{{ employees.length }}</strong><small>Across all departments</small></mat-card>
        <mat-card><span class="muted">Active employees</span><strong>{{ activeCount }}</strong><small>Currently active</small></mat-card>
        <mat-card><span class="muted">Departments</span><strong>{{ departmentCount }}</strong><small>Business units</small></mat-card>
        <mat-card><span class="muted">Pending leave</span><strong>{{ pendingLeaves }}</strong><small>Awaiting a decision</small></mat-card>
      </div>
      <mat-card class="recent">
        <h2>Recently added employees</h2>
        <div class="employee-row" *ngFor="let employee of employees.slice(-4).reverse()">
          <div class="avatar">{{ employee.firstName.charAt(0) }}{{ employee.lastName.charAt(0) }}</div>
          <div><strong>{{ employee.firstName }} {{ employee.lastName }}</strong><p class="muted">{{ employee.designation }}</p></div>
          <span class="toolbar-spacer"></span><span class="status" [class.active]="employee.status === 'Active'">{{ employee.status }}</span>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
    .stats mat-card { display: flex; flex-direction: column; gap: 8px; }
    .stats strong { font-size: 30px; color: #243b53; }
    .stats small { color: #718096; }
    .recent { margin-top: 22px; }
    h2 { font-size: 18px; }
    .employee-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-top: 1px solid #edf2f7; }
    .employee-row p { margin: 3px 0 0; font-size: 13px; }
    .avatar { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #e6eef8; color: #243b53; font-weight: 600; }
    @media(max-width:850px) { .stats { grid-template-columns: repeat(2,1fr); } }
  `]
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  leaves: LeaveRequest[] = [];
  departmentCount = 0;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.departmentCount = this.data.getDepartments().length;
    this.data.getEmployees().subscribe(items => this.employees = items);
    this.data.getLeaves().subscribe(items => this.leaves = items);
  }
  get activeCount(): number { return this.employees.filter(item => item.status === 'Active').length; }
  get pendingLeaves(): number { return this.leaves.filter(item => item.status === 'Pending').length; }
}
