import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { MaterialModule } from '../../shared/material.module';
@NgModule({ declarations: [LeavesComponent], imports: [CommonModule, LeavesRoutingModule, MaterialModule] })
export class LeavesModule {}
