import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { OperatorsComponent } from './operators/operators.component';
import { IncubatorsComponent } from './incubators/incubators.component';
import { ReportsComponent } from './reports/reports.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'users',
				component: UsersComponent
			},
			{
				path: 'operators',
				component: OperatorsComponent
			},
			{
				path: 'incubators',
				component: IncubatorsComponent
			},
			{
				path: 'reports',
				component: ReportsComponent
			}
		]
	}
];
