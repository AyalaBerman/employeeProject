import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Job } from '../models/job.model';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  path: string = "/api/Employee";
  employees: Employee[] = [];
  jobs: Job[] = [];
  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.path}`);
   
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.path}/${id}`);
  }

  postEmployee(employee: Employee): Observable<Employee> {

    console.log("העובד נוסף בסרוויס");
    return this._http.post<Employee>(`${this.path}`, employee);

  }

  putEmployee(id: number, employee: Employee): Observable<Employee> {
    return this._http.put<Employee>(`${this.path}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this._http.delete<void>(`${this.path}/${id}`);
  }

  postJob(employeeId: number, job: Job): Observable<any> {
    console.log("העבודה נוספה בסרוויס");
    return this._http.post<any>(`${this.path}/${employeeId}`, job);
  }

  constructor(private _http: HttpClient) { }
}

