import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import * as XLSX from 'xlsx';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { StatusService } from '../../services/status.service';


@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, AddEmployeeComponent, UpdateEmployeeComponent,MatInputModule,MatFormFieldModule,MatButtonModule, MatDialogModule, MatTableModule, MatIconModule],
  providers: [EmployeeService ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }
  searchText: string = '';
  filteredData: Employee[] = [];
  addEmployee: boolean = false;
  toUpdateEmployee: boolean = false;
  employeeToUpdate: number = 0;
  displayedColumns: string[] = ['firstName', 'lastName', 'identity', 'startDate', 'delete', 'update'];
  dataSource = this.filteredData;


  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      data => this.employeeService.employees=data,
      error => console.log(error.message)
    );
    this.filteredData = this.employeeService.employees;
    this.addEmployee = false;
    this.toUpdateEmployee = false;
  }


  openDialogAdd(): void {

    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: 'auto', 
      data: {id:0, firstName:'', lastName:'', identity:0,startJob:new Date()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogUpdate(employee:Employee): void {

    const dialogRef = this.dialog.open(UpdateEmployeeComponent  , {
      width: 'auto', 
      data: {id:employee.id, firstName:employee.firstName, lastName:employee.lastName, identity:employee.identity, startDate:employee.startDate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSearchChange(text: string) {
    this.searchText = text;
    if (text.trim() === '') { 
      this.filteredData = this.employeeService.employees;
    } else {
      this.filteredData = this.employeeService.employees.filter(obj => { 
        return Object.values(obj).some(value => {
          if (typeof value === 'string') {
            return value.includes(text);
          }
          return false;
        });
      });
    }
  }



  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.employeeService.getEmployees().subscribe(
          data => {
            this.employeeService.employees = data;
            this.onSearchChange(this.searchText);
          },
          error => console.log(error.message)
        );

      },
      (error) => {
        console.error('שגיאה במחיקת עובד:', error);
      }
    )
  }

  

  downloadExcel() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employees);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'employees'); 
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  showAddEmployee() {
    this.addEmployee = true;
  }

  updateEmployee(id: number) {
    this.toUpdateEmployee = true;
    this.employeeToUpdate = id;
  }
}


