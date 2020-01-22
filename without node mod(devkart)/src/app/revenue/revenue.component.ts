import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ClientService } from '../client.service';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  private chart: am4charts.XYChart;
  dataSource: Object;
  freshCount: any;
  expCount: any;
  revenuYear: any;
  revenuMap: any;
  expDetails: any;
  profit: any;
  constructor(private clientService: ClientService,private billservice: BillService) {
    this.expeChart();
    this.billservice.getOverAllProfit().subscribe (results =>{
     
       this.profit = results.profit;
   
    this.dataSource = {
      chart: {
        caption: "Company Profit Indicator",
        subcaption: "2020",
        lowerlimit: "0",
        upperlimit: "50000000",
        showvalue: "1",
        theme: "fusion"
    },

    colorrange: {
      color: [{
              minvalue: "0",
              maxvalue: "12500000",
              code: "#BB5D52 "
          },
          {
              minvalue: "25",
              maxvalue: "25000000",
              code: "#FFC533"
          },
          {
              minvalue: "60",
              maxvalue: "100",
              code: "#62B58F"
          }
      ]
  },
    dials: {
        dial: [{
            value:  this.profit,
            tooltext: "<b>9%</b> lesser that target"
        }]
    },
    trendpoints: {
      point: [{
          startvalue: "40000000",
          displayvalue: "Target",
          thickness: "2",
          color: "#E15A26",
          usemarker: "1",
          markerbordercolor: "#E15A26",
          markertooltext: "80%"
      }]
  }
  }
});
    }
    billableExpCount: any = []
    expeChart() {
      let  billableexpCount = [];
      this.clientService.getdashBoardExpChart().subscribe(results =>{
       
        this.expDetails = results.yearList;
        this.freshCount = results.fretMap;
        this.expCount = results.expCount;
   
      
      this.expDetails.map(item => {
       
        billableexpCount.push({
          year: item,
          Fresher:this.freshCount[item],
          Experience: this.expCount[item]
        });
      })
      
            // chart2
  
            am4core.ready(function() {
    
                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end
                
                 // Create chart instance
                 const chart = am4core.create('chartdiv2', am4charts.XYChart);
                
                // Add data
                chart.data = billableexpCount;
                
                // Create axes
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "year";
                categoryAxis.numberFormatter.numberFormat = "#";
                categoryAxis.renderer.inversed = true;
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.cellStartLocation = 0.1;
                categoryAxis.renderer.cellEndLocation = 0.9;
                
                var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
                valueAxis.renderer.opposite = true;
                
                // Create series
                function createSeries(field, name) {
                  var series = chart.series.push(new am4charts.ColumnSeries());
                  series.dataFields.valueX = field;
                  series.dataFields.categoryY = "year";
                  series.name = name;
                  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
                  series.columns.template.height = am4core.percent(100);
                  series.sequencedInterpolation = true;
                
                  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
                  valueLabel.label.text = "{valueX}";
                  valueLabel.label.horizontalCenter = "left";
                  valueLabel.label.dx = 10;
                  valueLabel.label.hideOversized = false;
                  valueLabel.label.truncate = false;
                
                  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
                  categoryLabel.label.text = "{name}";
                  categoryLabel.label.horizontalCenter = "right";
                  categoryLabel.label.dx = -10;
                  categoryLabel.label.fill = am4core.color("#fff");
                  categoryLabel.label.hideOversized = false;
                  categoryLabel.label.truncate = false;
                }
                
                createSeries("Fresher", "Fresher");
                createSeries("Experience", "Experience");
                
                });
              });
   
    }
    revenuCount: any = []
ngAfterContentInit() {
  let  revenuDetails = [];
this.billservice.getRevenuList().subscribe(revenu => {
 
  this.revenuYear = revenu.yearList;
  this.revenuMap = revenu.revenuMap;
  this.revenuYear.map(item => {
    revenuDetails.push({
      year: item,
      value:this.revenuMap[item],
     
    });
  })
  am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
const chart = am4core.create("chartdiv1", am4charts.XYChart);

// Add data
chart.data = revenuDetails;

// Populate data
for (var i = 0; i < (chart.data.length - 1); i++) {
  chart.data[i].valueNext = chart.data[i + 1].value;
}

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "value";
series.dataFields.categoryX = "year";

// Add series for showing variance arrows
var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "valueNext";
series2.dataFields.openValueY = "value";
series2.dataFields.categoryX = "year";
series2.columns.template.width = 1;
series2.fill = am4core.color("#555");
series2.stroke = am4core.color("#555");

// Add a triangle for arrow tip
var arrow = series2.bullets.push(new am4core.Triangle);
arrow.width = 10;
arrow.height = 10;
arrow.horizontalCenter = "middle";
arrow.verticalCenter = "top";
arrow.dy = -1;

// Set up a rotation adapter which would rotate the triangle if its a negative change
arrow.adapter.add("rotation", function (rotation, target) {
  return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
});

// Set up a rotation adapter which adjusts Y position
arrow.adapter.add("dy", function (dy, target) {
  return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
});

// Add a label
var label = series2.bullets.push(new am4core.Label);
label.padding(10, 10, 10, 10);
label.text = "";
label.fill = am4core.color("#0c0");
label.strokeWidth = 0;
label.horizontalCenter = "middle";
label.verticalCenter = "bottom";
label.fontWeight = "bolder";

// Adapter for label text which calculates change in percent
label.adapter.add("textOutput", function (text, target) {
  var percent = getVariancePercent(target.dataItem);
  return percent ? percent + "%" : text;
});

// Adapter which shifts the label if it's below the variance column
label.adapter.add("verticalCenter", function (center, target) {
  return getVariancePercent(target.dataItem) < 0 ? "top" : center;
});

// Adapter which changes color of label to red
label.adapter.add("fill", function (fill, target) {
  return getVariancePercent(target.dataItem) < 0 ? am4core.color("#c00") : fill;
});

function getVariancePercent(dataItem) {
  if (dataItem) {
    var value = dataItem.valueY;
    var openValue = dataItem.openValueY;
    var change = value - openValue;
    return Math.round(change / openValue * 100);
  }
  return 0;
}
});
}
  ngOnInit() {

  }

}
