
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHandler, withFetch } from '@angular/common/http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { Employee } from './models/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './modules/employee-list/employee-list.component';
import { EmployeeService } from './services/employee.service';
import { AddEmployeeComponent } from './modules/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './modules/update-employee/update-employee.component';
import { AddJobComponent } from './modules/add-job/add-job.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterOutlet, EmployeeListComponent, HttpClientModule, AddEmployeeComponent, UpdateEmployeeComponent, AddJobComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [EmployeeService, HttpClient, HttpClientModule,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }]
})
export class AppComponent {
  
  title = 'practicumClient';

}