import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Job } from '../../models/job.model';
import { EmployeeService } from '../../services/employee.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StatusService } from '../../services/status.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'add-job',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter(), { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } }],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})

export class AddJobComponent {
  @Input()
  employee?: Employee;
  job: Job = new Job();
  jobs: string[] = ["מפתח חומרה", "ורפיקטור", "מפתח full stack"];
  dateValid: boolean = true;
  constructor(public employeeService: EmployeeService, public status: StatusService) { }

  onSaveJob() {
    if (this.employee && this.employee.id) {
      this.employeeService.postJob(this.employee.id, this.job).subscribe(
        data => { console.log("success update job adding"); },
        error => console.log("failed update job adding")
      )
    }
    else {
      this.employeeService.jobs?.push(this.job);
      console.log("jobs " + this.employeeService.jobs?.length);
    }
    this.status.closeJob();

  }

  validDate(dateJob?: Date) {
    console.log("checking validation");
    console.log("job " + dateJob);
    console.log("emp " + this.employee?.startDate);
    if (dateJob && this.employee?.startDate && new Date(dateJob) >= new Date(this.employee.startDate))
      this.dateValid = true;
    else
      this.dateValid = false;
  }


}
