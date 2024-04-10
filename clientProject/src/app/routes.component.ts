import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './modules/add-employee/add-employee.component';
import { EmployeeListComponent } from './modules/employee-list/employee-list.component';
import { AddJobComponent } from './modules/add-job/add-job.component';
import { UpdateEmployeeComponent } from './modules/update-employee/update-employee.component';
import { Employee } from './models/employee.model';
const routes: Routes = [
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'addJob', component: AddJobComponent },
  { path: 'update', component: UpdateEmployeeComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' } // קובע איזה קומפוננטה תוצג בפתיחת האפליקציה
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }