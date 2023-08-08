import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { UsersComponent } from './users/users.component';
import { OperatorsComponent } from './operators/operators.component';
import { IncubatorsComponent } from './incubators/incubators.component';
import { ReportsComponent } from './reports/reports.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { MonitoringComponent } from './monitoring/monitoring.component';

@NgModule({
  imports: [
    DialogModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    UsersComponent,
    OperatorsComponent,
    IncubatorsComponent,
    ReportsComponent,
    TruncatePipe,
    MonitoringComponent
  ],
})
export class ComponentsModule { }
