import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,private route: Router) { 
    this.getDetailsWithId('clientId');
  }

  url: string = 'http://localhost:8080/clientinfo/clientinfo';

  selectedClient: any = {
    clientId: null,
    clientName: null,
    clientLogo: null,
    clienShortName: null,
    deptName: null,
    clientNo: null,
    clientEmail: null,
    compWebSite: null,
    streetAddress: null,
    addressLine2: null,
    city: null,
    state: null,
    zipCode: null,
    country: null
  };
  postData(client) {
    return this.http.post(`${this.url}`, client);
  }
  updateData(client) {
    return this.http.put(`${this.url}`, client);
  }
  getClientData() {
    return this.http.get<any>(`${this.url}`);
  }
  deleteClientData(data) {
    return this.http.delete(`${this.url}/${data.clientId}`)
  }
  getAllDetails() {
    return this.http.get('http://localhost:8080/clientinfo/getAllComp');
  }

  getCount(){
    return this.http.get<any>('http://localhost:8080/clientinfo/getcount');
  }
data: any = [];
uniqueStack:any=[];
stackCount : any =[];
  getDetailsWithId(clientId): Observable<any> {
  //  this.http.get(`${'http://localhost:8080/clientinfo/getStackDetails'}/${clientId}`).subscribe(response => {
  //    this.data=response
  return this.http.get(`${'http://localhost:8080/clientinfo/getUniqueStack'}/${clientId}`)
  
  }

  getStackDeatis(compId): Observable<any> { 
          return this.http.get(`${'http://localhost:8080/clientinfo/getStackCount'}/${compId}`)
  }
  getEmpDetailsWithId(clientId): Observable<any> {
    return this.http.get(`${'http://localhost:8080/clientinfo/getStackDetails'}/${clientId}`)
  }
  getYearList(clientId): Observable<any> {
    return this.http.get(`${'http://localhost:8080/clientinfo/getYearList'}/${clientId}`)
  }

  getdashBoardExpChart(): Observable<any>  {

    return this.http.get('http://localhost:8080/clientinfo/getFreshExpDeatails');
  }

  

}
