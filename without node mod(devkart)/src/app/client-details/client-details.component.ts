import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  items: any = [];

  constructor(private service: ClientService, private router: Router) {
    this.getData();
  }

  private clientsDetail: any = [];
  clients: any = [];
  array;
  getData() {
    this.service.getClientData().subscribe(res => {
      this.clients = res;
   
      this.array = this.clients.listclients;
    
    })
  }
  delete(data) {
   
    this.service.deleteClientData(data).subscribe(res => {
     
      this.getData();
      this.router.navigateByUrl("/client-details")
    })
  }
  update(data) {
  
    this.service.selectedClient = data;
    this.router.navigateByUrl("/client");
  }

  printSelectedRow(data) {
   
  }

  ngOnInit() {
    this.items = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
  }

  onChangePage(clientsDetail: Array<any>) {
    this.clientsDetail = clientsDetail;
  }
}
