import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-my-visits',
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.css']
})
export class MyVisitsComponent implements OnInit {

   visits:any = [];
   fls: boolean = true;
   dataExists: boolean; 
   type : string = "";
   pieChartLabels = ['Male','Female','Other','Empty'];
   pieChartData = [0,0,0,0];
   pieChartType = 'pie';

  constructor(public rest:RestService) { }


  ngOnInit() {
    this.type="operations";
    this.getVisits();
  }

  resetValues()
  {
    this.pieChartData= [0,0,0,0];
  }

  changeLabel(event: any)
  {
    this.pieChartLabels[3]="Changed";
  }

  getVisits(): any 
{
  
  //  this.visits=[];
  this.dataExists=false;
    this.rest.getVisits("sKWnIFQ3HeWzZW5Z2M0C49b6CWj2","-LMlWQeB6J0MY-tDOoeI","","","","","","","").subscribe((data: {data}) => {
      this.visits = data.data;
      this.showSum(event);
    });
}

showCount(event: any)
{
  this.resetValues();
for (var visit of this.visits) 
    {
        if(visit.userData.gender=="Male")
        { 
          this.pieChartData[0]++;
        }

        else if(visit.userData.gender=="Female")
        { 
          this.pieChartData[1]++;
        }

        else if(visit.userData.gender=="Other")
        { 
          this.pieChartData[2]++;
        }

        else 
        { 
          this.pieChartData[3]++;
        }
      }
      this.dataExists=true;
   }

showSum(event: any)
  {
    this.resetValues();
for (var visit of this.visits) 
    {
        if(visit.userData.gender=="Male")
        { 
           this.pieChartData[0]+=visit.spentSum;
        }

        else if(visit.userData.gender=="Female")
        { 
           this.pieChartData[1]+=visit.spentSum;        }

        else if(visit.userData.gender=="Other")
        { 
           this.pieChartData[2]+=visit.spentSum;
        }

        else 
        { 
          this.pieChartData[3]+=visit.spentSum;
        }
      }
      this.pieChartData = this.pieChartData.map(e=> parseFloat(e.toFixed(2)))
      this.dataExists=true;
  }
}
