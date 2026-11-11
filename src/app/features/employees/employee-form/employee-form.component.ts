import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Department } from '../../../core/models/department.model';
import { Employee } from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-form',
  template: `
    <div class="page">
      <div class="page-header"><div><h1>{{ isEdit ? 'Edit employee' : 'Add employee' }}</h1><p class="muted">Enter the employee details below</p></div></div>
      <mat-card>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="form-grid">
            <mat-form-field appearance="outline"><mat-label>First name</mat-label><input matInput formControlName="firstName"><mat-error>First name is required (max 50 characters)</mat-error></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Last name</mat-label><input matInput formControlName="lastName"><mat-error>Last name is required (max 50 characters)</mat-error></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput formControlName="email" type="email"><mat-error>Enter a valid email address</mat-error></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Phone</mat-label><input matInput formControlName="phone"><mat-error>Phone is required</mat-error></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Department</mat-label><mat-select formControlName="departmentId"><mat-option *ngFor="let department of departments" [value]="department.id">{{ department.name }}</mat-option></mat-select></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Designation</mat-label><input matInput formControlName="designation"><mat-error>Designation is required</mat-error></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Joining date</mat-label><input matInput type="date" formControlName="joiningDate"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Status</mat-label><mat-select formControlName="status"><mat-option value="Active">Active</mat-option><mat-option value="Inactive">Inactive</mat-option></mat-select></mat-form-field>
          </div>
          <div class="actions"><button mat-button type="button" (click)="router.navigate(['/employees'])">Cancel</button><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Save employee</button></div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`.actions { display:flex; justify-content:flex-end; gap:12px; padding: 12px 0 4px; }`]
})
export class EmployeeFormComponent implements OnInit {
  departments: Department[] = this.data.getDepartments();
  isEdit = false;
  employeeId = 0;
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    departmentId: [1, Validators.required],
    designation: ['', Validators.required],
    joiningDate: [new Date().toISOString().slice(0, 10), Validators.required],
    status: ['Active' as Employee['status'], Validators.required]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public router: Router, private data: DataService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const employee = this.data.getEmployee(id);
      if (employee) {
        this.isEdit = true;
        this.employeeId = id;
        this.form.patchValue(employee);
      }
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const employee: Employee = {
      id: this.employeeId,
      firstName: value.firstName || '',
      lastName: value.lastName || '',
      email: value.email || '',
      phone: value.phone || '',
      departmentId: Number(value.departmentId),
      designation: value.designation || '',
      joiningDate: value.joiningDate || '',
      status: value.status || 'Active'
    };
    this.data.saveEmployee(employee);
    this.router.navigate(['/employees']);
  }
}
