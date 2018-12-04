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
  ageFilters: any = [{fromAge: 18, toAge:30 }, {fromAge:0, toAge:0}];
   dataExists: boolean = false; 
   type : string = "";
   lineChartLabels = [];
   sums:any = [];
   lineChartData = [];
   lineChartDataSet=[];
   lineChartType = 'line';
   myLineChart={};
   public lineChartOptions:any = {
    responsive: true,
    legend: {
      display: true,
      position: 'top',
    },
  };
  constructor(public rest:RestService, private spinnerService: Ng4LoadingSpinnerService) {}



  ngOnInit() {
    this.getVisits();
  }
 
 birthdayToAge(date:string) {
    let birthday= new Date(date);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  resetValues()
  {
    this.lineChartData.length = 0;
    this.lineChartLabels.length=0;
    this.lineChartDataSet.length=0;
    this.sums.length=0;
  }

  getVisits(): any 
{
  
  this.dataExists=false;
  this.spinnerService.show();
  this.rest.getVisits("sKWnIFQ3HeWzZW5Z2M0C49b6CWj2","-LMlWQeB6J0MY-tDOoeI","","","","","","","").subscribe((data: {data}) => {
    this.visits = data.data;
      this.calculate(event,"suma");

    });
}

calculate(event: any, type:string )
{
  
  this.resetValues();
  this.dataExists=false;
  this.spinnerService.show();
for (let visit of this.visits) 
{
let ageCorrect=false;  
  visit.userData.age= this.birthdayToAge(visit.userData.birthDate)
  
      for (let ageFilter of this.ageFilters)
    {
        if(visit.userData.age>=ageFilter.fromAge && visit.userData.age<=ageFilter.toAge)
        {
        ageCorrect=true;
        break;
        }
    }
      
    if(ageCorrect)
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
  
}  
    // this.sums=this.sums.filter((o) => o.date!=undefined);
     this.sums.sort((a, b) => a.date.localeCompare(b.date));
     this.lineChartLabels=this.sums.map(obj=> obj.date);
     if(type=="sum")
     {
     this.lineChartData=this.sums.map(obj=>parseFloat(obj.spentSum.toFixed(2)));
     this.lineChartDataSet.push({data:this.lineChartData,label: 'Sum'});
     }
     else
     {
      this.lineChartData=this.sums.map(obj=>obj.visitsCount);
      this.lineChartDataSet.push({data:this.lineChartData,label: 'Count'});
      console.log("Count");
     }
      this.dataExists=true;
      this.spinnerService.hide();
      console.log(this.lineChartDataSet);
      
   }


showSum(event: any)
  {
    this.spinnerService.show();
    this.calculate(event,"sum");    
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
