import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientlogo',
  templateUrl: './clientlogo.component.html',
  styleUrls: ['./clientlogo.component.css']
})
export class ClientlogoComponent implements OnInit {

  clients:any;
  countList: any;
  countEmp: any;
  constructor(private service : ClientService, private route: Router) { 
    this.getData();
    this. getEmpCount();

  }

  getData() {
    this.service.getClientData().subscribe(res => {
      this.clients = res;
      this.clients = this.clients.listclients;
    
    })
  }

  getEmpCount(){
    this.service.getCount().subscribe(data => {
      this.countEmp = data;
      this.countEmp = this.countEmp.countMap;
    
     
    });
  }
  chartData(clientId) {
   
    this.service.getDetailsWithId(clientId).subscribe(responce=>{
     
      localStorage.setItem('results', JSON.stringify(responce));
    })
     this.service.getStackDeatis(clientId).subscribe (stackCount => {
     
      localStorage.setItem('countStack', JSON.stringify(stackCount));
    })
     this.service.getYearList(clientId).subscribe(expCountList=>{
        
        localStorage.setItem('yearMap', JSON.stringify(expCountList));
       })
   
  this.route.navigateByUrl("/clidata");
  }

  getBillables(clientId) {
   this.service.getEmpDetailsWithId(clientId).subscribe(empDeatis =>{
    
      localStorage.setItem('billables', JSON.stringify(empDeatis));
      this.route.navigateByUrl('/billdata');
    })


    
  }

  

  ngOnInit() {
  }

}
