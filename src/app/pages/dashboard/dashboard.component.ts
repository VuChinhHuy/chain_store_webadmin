import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/service/dashboard.services';


import { DatePipe, formatDate } from '@angular/common';
// range picker
// create a chart of revenue statistics by invoice in angular 12
// https://www.freakyjolly.com/angular-material-date-time-range-selection-picker-tutorial/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit {
  // Revenue chart years
  labelProfit: any;
  dataprofit: any;
  dataProductNumber: any;
  revenueYear: any;
  // Revenue chart weeks
  dates: any = " ";
  datee: any = " ";
  labelProfitWeek: any;
  dataprofitWeek: any;
  dataProductNumberWeek: any;
  revenueWeek: any;
  selected: any = { start: Date, end: Date };
  ranges: any;
  //
  someBill: any;
  profitLastMonth: any;
  TopProduct: any;
  Descen: any;


  // picker ranger
  constructor(private dashboardService: DashboardService) {

  }
  //console.log(this.selected.endDate.format("DD-MMMM-YY"));

  ngOnInit() {
    Chart.register(...registerables);
    this.getRevenueByYear();
    this.getRevenueByWeek();
    this.GetCalculateLastMonth();
    this.GetBetSellingProduct();
  }
  GetCalculateLastMonth() {
    this.dashboardService.GetCalculateLastMonth()
      .subscribe(
        (Status: any) => {
          this.someBill = Status[0].count;
          this.profitLastMonth = Status[0].total;
        },
        (error: any) => {
          console.log(error);
        });
  }
  GetBetSellingProduct() {
    this.dashboardService.GetBetSellingProduct()
      .subscribe(
        (Status: any) => {
          Status.forEach((obj: any) => {
            if(obj.maxValue != null)
              this.TopProduct = obj.maxValue.nameProduct;
            else
              this.Descen = obj.minValue.nameProduct;
          });
        },
        (error: any) => {
          console.log(error);
        });
  }


  getRevenueByYear() {
    this.dashboardService.getRevenueByYear()
      .subscribe(
        (Status: any) => {
          this.revenueYear = Status;
          this.labelProfit = Status.map(function (obj: any) {
            return obj.rYear;
          });
          this.dataprofit = Status.map(function (obj: any) {
            return obj.rprofit;
          });
          this.dataProductNumber = Status.map(function (obj: any) {
            return obj.rproductNumber;
          });
          this.RevenueChartYear();
        },
        (error: any) => {
          console.log(error);
        });
  }
  CustomRevenueChart() {

  }
  getSelectDate(selected: any) {
    // var dat = new Date(selected.startDate);
    // var dat2 = JSON.stringify(dat);
    // dat2 = dat2.slice(1, 11);
    //console.log(selected);
    if (selected.startDate != null && selected.endDate != null) {
      this.dates = JSON.stringify(new Date(selected.startDate)).slice(1, 11);
      this.datee = JSON.stringify(new Date(selected.endDate)).slice(1, 11);
      console.log(this.dates);
      console.log(this.datee);
      this.getRevenueByWeek();
    }

  }
  getRevenueByWeek() {
    // this.dashboardService.getRevenueByWeek(this.dates, this.datee).subscribe(searchData => this.revenueWeek = searchData);
    this.dashboardService.getRevenueByWeek(this.dates, this.datee)
      .subscribe(
        (Status: any) => {
          this.revenueWeek = Status;
          console.log(this.revenueWeek);
          this.labelProfitWeek = Status.map(function (obj: any) {
            return obj.rYear;
          });
          this.dataprofitWeek = Status.map(function (obj: any) {
            return obj.rprofit;
          });
          this.dataProductNumberWeek = Status.map(function (obj: any) {
            return obj.rproductNumber;
          });
          this.RevenueChartWeek();
        },
        (error: any) => {
          console.log(error);
        });
  }

  RevenueChartYear() {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labelProfit,
        datasets: [{
          label: 'Doanh thu',
          data: this.dataprofit,
          backgroundColor: "#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1
        },
        ]
      },
      options: {
        // scales: {
        //     y: {
        //         beginAtZero: true
        //     }
        // }
      }
    });
  }
  RevenueChartWeek() {
    var myChartWeek = new Chart("myChartWeek", {
      type: 'line',
      data: {
        labels: this.labelProfitWeek,
        datasets: [{
          label: 'Doanh thu',
          data: this.dataprofitWeek,
          //backgroundColor:"#0196FD",
          borderColor: "#0196FD",
          fill: false,
          borderWidth: 1
        },
        {
          label: 'Sản phẩm',
          data: this.dataProductNumberWeek,
          //backgroundColor:"#FFAF00",
          borderColor: "#FFAF00",
          fill: false,
          borderWidth: 1
        }]
      },
      options: {
        // indexAxis: 'y',
        // scales: {
        //   x?: Boolean {
        //     beginAtZero: true,
        //   }
        // }
      }
    });
  }
}
