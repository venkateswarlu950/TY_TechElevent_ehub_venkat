import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { BillService } from '../bill.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-billable-details',
  templateUrl: './billable-details.component.html',
  styleUrls: ['./billable-details.component.css']
})
export class BillableDetailsComponent implements OnInit {
  items: any=[];
  packageDetails: any;
  clients: any;

  constructor(private service: BillService, private router: Router) {
    this.getBillable();
  }
  
  getBillable() {
    let getmyVal: any = JSON.parse(localStorage.getItem("billables"));
   
    this.clients = getmyVal;
   
    this.clients = this.clients.listBill;
  } 

  delete(data) {
  
    this.service.deleteClientData(data).subscribe(res => {
     
      this.getBillable();
      this.router.navigateByUrl("/billdata");
    })
  }
  update(data) {
   
    this.service.selectedBillable = data;   
    this.router.navigateByUrl("/billable");
  }
  
  printPackageDetails(form: NgForm) {
    
    this.service.postDataPack(form.value).subscribe(results => {
    
      this.clients = results;
      form.reset();
      this.router.navigateByUrl("/pakdetails");
    }, (err) => {
      console.log(err);
    }, () => {
      console.log("data inserted successfully");
    })
  } 

  getPackageForm(data) {
    console.log('step-4::',data)
   this.packageDetails = data;
   console.log('step-5::', this.packageDetails)

  }

  ngOnInit() {
   

  }

}