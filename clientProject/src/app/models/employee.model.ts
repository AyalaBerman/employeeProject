import { Job } from "./job.model";
export class Employee{
    public id?:number;
    public firstName?:string;
    public lastName?:string;
    public identity?:string;
    public startDate?:Date;
    public jobs?:Job[];
    public deleted?:boolean;
}

