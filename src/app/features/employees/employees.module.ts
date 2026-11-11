import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EmployeesRoutingModule, MaterialModule]
})
export class EmployeesModule {}
