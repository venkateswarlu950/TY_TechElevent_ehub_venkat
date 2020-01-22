import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-billableform',
  templateUrl: './billableform.component.html',
  styleUrls: ['./billableform.component.css']
})
export class BillableformComponent implements OnInit {
  billables:any;
  selectedBillable: any={
    empName:null,
    deployementDate:null,
    contractEndDate:null,
    rateCardPerMonth:null,
    stack:null,
    yoe:null
  }
  private clientsDetail: any = [];
  array : any =[];
  clients: any;
  constructor(private service: BillService,private cliservice : ClientService, private router: Router) {
    this.getData();
    this.getClients();

   }

   getData() {
    this.service.getBillData().subscribe(res => {
      this.billables = res;
     
      this.billables = this.billables.listclients;
     
      console.dir(this.array)
    })
  }
  getClients() {
    this.cliservice.getClientData().subscribe(comp =>{
    
      this.clients = comp.listclients;
      
    })
 
  }

  printBillableForm(billable) {
    if (billable.employeeId) {
     
      this.service.updateData(billable).subscribe(billable => {
       
        this.billables = billable;
        this.router.navigateByUrl("/billable-details")
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("data sent successfully");
      })
    } else {
    
      this.service.postData(billable).subscribe(billable => {
       
        this.billables= billable;
        this.router.navigateByUrl("/billable-details")
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("data sent successfully");
      })
    }
  }

  printSelectedRow(data) {
   
  }

  onChangePage(clientsDetail: Array<any>) {
    this.clientsDetail = clientsDetail;
  }
  
  ngOnInit() {
    this.selectedBillable = this.service.selectedBillable;
   
  }

}
