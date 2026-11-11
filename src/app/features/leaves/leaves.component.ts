import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { LeaveRequest } from '../../core/models/leave-request.model';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-leaves',
  template: `
    <div class="page">
      <div class="page-header"><div><h1>Leave requests</h1><p class="muted">Review and manage employee time off</p></div></div>
      <mat-card class="table-card">
        <table mat-table [dataSource]="leaves">
          <ng-container matColumnDef="employee"><th mat-header-cell *matHeaderCellDef>Employee</th><td mat-cell *matCellDef="let item">{{ employeeName(item.employeeId) }}</td></ng-container>
          <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef>Type</th><td mat-cell *matCellDef="let item">{{ item.type }}</td></ng-container>
          <ng-container matColumnDef="dates"><th mat-header-cell *matHeaderCellDef>Dates</th><td mat-cell *matCellDef="let item">{{ item.startDate }} – {{ item.endDate }}</td></ng-container>
          <ng-container matColumnDef="reason"><th mat-header-cell *matHeaderCellDef>Reason</th><td mat-cell *matCellDef="let item">{{ item.reason }}</td></ng-container>
          <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let item"><span class="status" [class.pending]="item.status === 'Pending'" [class.approved]="item.status === 'Approved'" [class.rejected]="item.status === 'Rejected'">{{ item.status }}</span></td></ng-container>
          <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let item">
            <ng-container *ngIf="item.status === 'Pending'">
              <button mat-button color="primary" (click)="update(item.id, 'Approved')">Approve</button>
              <button mat-button color="warn" (click)="update(item.id, 'Rejected')">Reject</button>
            </ng-container>
            <span *ngIf="item.status !== 'Pending'" class="muted">No action</span>
          </td></ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr><tr mat-row *matRowDef="let row; columns: columns"></tr>
        </table>
        <p *ngIf="leaves.length === 0" class="muted empty">No leave requests found.</p>
      </mat-card>
    </div>
  `
})
export class LeavesComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  employees: Employee[] = [];
  columns = ['employee', 'type', 'dates', 'reason', 'status', 'actions'];
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.getLeaves().subscribe(items => this.leaves = items);
    this.data.getEmployees().subscribe(items => this.employees = items);
  }
  employeeName(id: number): string {
    const employee = this.employees.find(item => item.id === id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown employee';
  }
  update(id: number, status: LeaveRequest['status']): void { this.data.updateLeaveStatus(id, status); }
}
