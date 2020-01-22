import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BillService } from '../bill.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-billdashboard',
  templateUrl: './billdashboard.component.html',
  styleUrls: ['./billdashboard.component.css']
})
export class BilldashboardComponent implements OnInit {
  count: any;
  expi: any;
  expidetails: any;

  // private chart: am4charts.XYChart;
  // dataSource: Object;
  constructor(private billservice: BillService,private service : ClientService) { 
    this.getBillDetails();
    this.getExpChart();
    // this.getStackCount();
  }

// getBillDetails() {
//   this.billservice.getBills().subscribe(data => {
// console.log('billList',data)
//   });
// }

// getStackCount() {
//   this.billservice.getStackCount().subscribe(countDeatils =>{
//     console.log('count details',countDeatils)
//   })
// }

getExpChart(){
  let series = [];
this.billservice.getExpList().subscribe(experinaceList=>{
 
  this.expi=experinaceList.expList;
  this.billservice.getExpiCount().subscribe(expiCount=>{
 
    this.count=expiCount.countexpi;
  this.expi.map(yoexp => {
  
    series.push({
      year: yoexp+' year',
      y: this.count[yoexp]
    });
  })
 const cart3 =  Highcharts.chart('container2' ,{
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Experience Wise  Billable Engineers',
      x:+15
    },
    tooltip: {
          pointFormat: '{series.data.year} {point.year}: {series.name}: <b>{point.y:.0f}</b>'
        },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.year}</b> ({point.y:,.0f}) ',
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '150%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Number of Employees',
      innerSize: '50%',
     data:series,
     
    }]
    });
    
});
});
}

  highcharts = Highcharts;
//chart3
// cart3 = {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: 0,
//     plotShadow: false
//   },
//   title: {
//     text: 'Experience Wise  Billable Engineers',
//     x:+15
//   },
//   tooltip: {
//         pointFormat: '{series.data.year} {point.year}: {series.name}: <b>{point.y:.0f}</b>'
//       },
//   plotOptions: {
//     pie: {
//       dataLabels: {
//         enabled: true,
//         format: '<b>{point.year}</b> ({point.y:,.0f}) ',
//         style: {
//           fontWeight: 'bold',
//           color: 'black'
//         }
//       },
//       startAngle: -90,
//       endAngle: 90,
//       center: ['50%', '75%'],
//       size: '150%'
//     }
//   },
//   series: [{
//     type: 'pie',
//     name: 'Number of Employees',
//     innerSize: '50%',
//     data: [
      
//       {
//         year:'0 Years', y : 20,
//         events : { click:function(){
//           window.location.href = "/table"
//         }
//       }
//       },
//       {
//         year:'0-1 Years', y : 20,
//         events : { click:function(){
//           window.location.href = "/table"
//         }
//       }
//       },
//       {
//         year:'1-2 Years', y : 20,
//         events : { click:function(){
//           window.location.href = "/table"
//         }
//       }
//       },
//       {
//         year:'2-3 Years', y : 20,
//         events : { click:function(){
//           window.location.href = "/table"
//         }
//       }
//       },
//       {
//         year:'>3 Years', y : 20,
//         events : { click:function(){
//           window.location.href = "/table"
//         }
//       }
//       }
//     ]
//   }]
//   };
  
  // c1
details : any =[]
  getBillDetails() {
    
    let series = [];
    this.billservice.getBills().subscribe(BillableEmployeesDetails => {
      
       this.details = BillableEmployeesDetails.listBill;
    
       this.billservice.getStackCount().subscribe(countDeatils =>{
       
        this.count = countDeatils.countMap;
       this.details.map(item => {
        
         series.push({
           name: item,
           y: this.count[item]
         });
       })
      //  for (let i = 0; i < this.details.length; i++) {
      //    series.push({
      //      name: this.details[i].listBill.stack,
      //      y: 2
      //    });
      //  }
       console.log('series' + series[0]);
       const chart =  Highcharts.chart('container1' , {
         chart: {
           plotBackgroundColor: null,
           plotBorderWidth: null,
           plotShadow: false,
           type: 'pie'
         },
         title: {
           text: 'Technology Wise Billable Engineers',
           x: +20
         },
         legend: {
           shadow: false
         },
         tooltip: {
           pointFormat: '<b>{point.y}</b>'
         },
         plotOptions: {
           pie: {
             allowPointSelect: true,
             // grouping: false,
             shadow: false,
             cursor: 'pointer',
             dataLabels: {
               enabled: false
             },
             showInLegend: true
           }
         },
         series: [{
           type: 'pie',
           data: series,
       }],
         credits: {
           enabled: false
         },
       });
 
     }, err => {
       console.log(err);
     }, () => {
       console.log('Details Came into DashBoard');
     });
    })
   }    
  
  ngOnInit() {
  }

}
