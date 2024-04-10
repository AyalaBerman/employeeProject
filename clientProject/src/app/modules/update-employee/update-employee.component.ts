import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Input } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { AddJobComponent } from '../add-job/add-job.component';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'update-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDatepicker, AddJobComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  addJob: boolean = false;
  constructor(public status: StatusService, public dialog: MatDialog, private employeeService: EmployeeService, public dialogRef: MatDialogRef<UpdateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee) { }

  form: FormGroup = new FormGroup({
    "firstName": new FormControl(this.data?.firstName, [Validators.required, Validators.minLength(2)]),
    "lastName": new FormControl(this.data?.lastName, [Validators.required, Validators.minLength(2)]),
    "identity": new FormControl(this.data?.identity, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    "startDate": new FormControl(this.data?.startDate, Validators.required),
  })
  ngOnInit() {

  }

  onSubmit() {
    this.data = {
      id:this.data.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      identity: this.form.value.identity,
      startDate: this.form.value.startDate,
      deleted: false,
      jobs: []
    };
    if (this.data.id) {
      console.log("enter");
      this.employeeService.putEmployee(this.data.id, this.data).subscribe(
        updatedEmployee => {
          this.data = updatedEmployee;
          console.log("data updated");
        },
        error => {
          console.error('Failed to update employee:', error);
        }
      );
    }
    this.status.closeJob();
    this.dialogRef.close();
    window.location.reload();
  }
  showAddJob(): void {
    this.status.openJob();
  }
}


