import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clients: any = [];

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
  constructor(private service: ClientService, private router: Router) {

  }

  printClientForm(client) {
    if (client.clientId) {
   
      this.service.updateData(client).subscribe(client => {
      
        this.clients = client;
        this.router.navigateByUrl("/client-details")
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("data sent successfully");
      })
    } else {
   
      this.service.postData(client).subscribe(client => {
      
        this.clients = client;
        this.router.navigateByUrl("/client-details")
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("data sent successfully");
      })
    }
  }

  ngOnInit() {
    this.selectedClient = this.service.selectedClient;
    
  }

}
