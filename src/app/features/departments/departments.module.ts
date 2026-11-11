import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { MaterialModule } from '../../shared/material.module';
@NgModule({ declarations: [DepartmentsComponent], imports: [CommonModule, DepartmentsRoutingModule, MaterialModule] })
export class DepartmentsModule {}
