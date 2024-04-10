import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  isOpenJob: boolean = false;
  isOpenAdd: boolean=false;
  isOpenUpdate:boolean=false;
  isExist:boolean=false;

  openJob() {
    this.isOpenJob = true;
  }

  closeJob() {
    this.isOpenJob = false;
  }

  openAdd() {
    this.isOpenAdd = true;
  }

  closeAdd() {
    this.isOpenAdd = false;
  }
  constructor() { }
}
