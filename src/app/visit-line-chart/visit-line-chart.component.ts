import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { formatDate } from '@angular/common';
import Chart from '../../../node_modules/chart.js';

@Component({
  selector: 'app-visit-line-chart',
  templateUrl: './visit-line-chart.component.html',
  styleUrls: ['./visit-line-chart.component.css']
})
export class VisitLineChartComponent implements OnInit {

  visits:any = [];
  lineChartLegend : string = "Sum";
   dataExists: boolean = false; 
   type : string = "";
   lineChartLabels = [];
   sums:any = [];
   lineChartData = [];
   lineChartType = 'line';
   myLineChart={};
   public lineChartOptions:any = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      label: "Suma"
    },
    label: "Sum"
  };
  constructor(public rest:RestService, private spinnerService: Ng4LoadingSpinnerService) {}



  ngOnInit() {
    this.getVisits();
  }

  resetValues()
  {
    this.lineChartData= [];
    this.lineChartLabels=[];
    this.sums=[];
    console.log(this.lineChartData);
  }

  changeLabel(event: any)
  {
    this.lineChartLabels[3]="Changed";
  }

  getVisits(): any 
{
  
  this.dataExists=false;
  this.spinnerService.show();
    this.rest.getVisits("sKWnIFQ3HeWzZW5Z2M0C49b6CWj2","-LMlWQeB6J0MY-tDOoeI","","2018-10-25","2018-11-26","","","","").subscribe((data: {data}) => {
      this.visits = data.data;
      this.calculate(event,"sum");

    });
}

calculate(event: any, type:string )
{
  
  this.resetValues();
  this.spinnerService.show();
for (let visit of this.visits) 
    {
      let date = formatDate(visit.dateTime,"yyyy-MM-dd","en-US")
      if(!this.lineChartLabels.includes(date))
      {
      this.lineChartLabels.push(date);
      this.sums.push({date:date,spentSum:visit.spentSum,visitsCount:1})
     }

     else 
     {
       let index = this.sums.findIndex(k => k.date==date)
       this.sums[index] = {date:date, spentSum:this.sums[index].spentSum+visit.spentSum,
        visitsCount:this.sums[index].visitsCount+1 }
     }

     }  
    // this.sums=this.sums.filter((o) => o.date!=undefined);
     this.sums.sort((a, b) => a.date.localeCompare(b.date));
     this.lineChartLabels=this.sums.map(obj=> obj.date);
     if(type=="sum")
     {
     this.lineChartData=this.sums.map(obj=>obj.spentSum);
     }
     else
     {
      this.lineChartData=this.sums.map(obj=>obj.visitsCount);
     }
      this.dataExists=true;
      this.spinnerService.hide();
      console.log(this.lineChartData);
   }


showSum(event: any)
  {
    this.spinnerService.show();
    this.calculate(event,"sum");
      
      this.dataExists=true;
      this.spinnerService.hide();

  }

  showCount(event:any)
  {
    this.spinnerService.show();
    this.calculate(event,"count");
    this.dataExists=true;
    this.spinnerService.hide();

  }


}
