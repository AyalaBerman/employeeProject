import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AddJobComponent } from '../add-job/add-job.component';
import { HttpClientModule } from '@angular/common/http';
import { Inject } from '@angular/core'
import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StatusService } from '../../services/status.service';
import { stat } from 'fs';

@Component({
  selector: 'add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AddJobComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee: Employee = new Employee();
  employees: Employee[] = [];
  addJob: boolean = false;
  form: FormGroup = new FormGroup({
    "firstName": new FormControl(this.employee?.firstName, [Validators.required, Validators.minLength(2)]),
    "lastName": new FormControl(this.employee?.lastName, [Validators.required, Validators.minLength(2)]),
    "identity": new FormControl(this.employee?.identity, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    "startDate": new FormControl(this.employee?.startDate, Validators.required),
  })
  formValid: boolean = false;


  constructor(public status: StatusService, public dialogRef: MatDialogRef<AddEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee, private employeeService: EmployeeService) { }
  ngOnInit() {
    this.addJob = false;
    this.status.closeJob();
  }
 

  showAddJob() {
    this.employee = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      identity: this.form.value.identity,
      startDate: this.form.value.startDate,
      deleted: false,
      jobs: []
    };
    this.status.openJob();
  }
  existIdentity(identity: string) {
    console.log("validate");
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data;
        console.log("as if " + this.status.isExist)
        if (this.employees.find(e => e.identity == identity)) {
          console.log(this.employees);
          this.status.isExist = true;
          console.log(this.status.isExist);
          console.log("תעודת זהות קיימת");
        }
        else{
          this.status.isExist=false;
        }
      },
      error => console.log(error)
    );
    console.log(this.employees);

  }


  onSubmit() {
    console.log(this.employeeService.employees.length + " נננננננננננ");
    this.employee = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      identity: this.form.value.identity,
      startDate: this.form.value.startDate,
      deleted: false,
      jobs: this.employeeService.jobs
    };
    this.employeeService.postEmployee(this.employee).subscribe(
      data =>
        this.employee = data,
      error => console.log(error.message)
    ); console.log("Employee data after submission: ", this.employee);

    this.employeeService.jobs.forEach(job => {
      if (this.employee.id)
        this.employeeService.postJob(this.employee.id, job).subscribe(
          data => console.log("success update new"),
          error => console.log("failed update new")
        )
    });
    this.employeeService.jobs = [];
    this.dialogRef.close();
    this.status.closeJob();
    window.location.reload();
    window.location.reload();
  }
}


