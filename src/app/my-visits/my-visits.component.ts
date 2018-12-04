import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-my-visits',
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.css']
})
export class MyVisitsComponent implements OnInit {

   ageFilters: any = [{fromAge: 18, toAge:19 }, {fromAge:20, toAge:22}, {fromAge:23, toAge:30}];
   visits:any = [];
   dataExists: boolean; 
   ageCorrect : boolean;
   type : string = "";
   pieChartLabels = [];
   pieChartData = [0,0,0,0];
   pieChartType = 'pie';

  constructor(public rest:RestService) { }


  ngOnInit() {
    this.type="operations";
    this.getVisits();
  }

  resetGenderValues()
  {
    this.pieChartData= [0,0,0,0];
    this.pieChartLabels.length = 0;
    this.pieChartLabels.push('Male');
    this.pieChartLabels.push('Female');
    this.pieChartLabels.push('Other');
    this.pieChartLabels.push('Empty');
  }

  resetAgeValues()
  {
    this.pieChartData= [];
    this.pieChartLabels.length = 0;
  }

  birthdayToAge(date:string) {
    let birthday= new Date(date);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getVisits(): any 
{
  
   this.visits=[];
  this.dataExists=false;
    this.rest.getVisits("sKWnIFQ3HeWzZW5Z2M0C49b6CWj2","-LMlWQeB6J0MY-tDOoeI","","","","","","","").subscribe((data: {data}) => {
      this.visits = data.data;
      this.showSum(event);
    });
}

showCount(event: any)
{
  this.resetGenderValues();
for (var visit of this.visits) 
    {
      visit.userData.age= this.birthdayToAge(visit.userData.birthDate)
      let ageCorrect=false;
      for ( var i=0;i<this.ageFilters.length;i++)
      {
        
        if(visit.userData.age>=this.ageFilters[i].fromAge && visit.userData.age<=this.ageFilters[i].toAge)
        {
        ageCorrect=true;
        }
        else
        {
          ageCorrect=false;
        }

        if(ageCorrect)
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
    }
      }
      this.dataExists=true;
      console.log(this.pieChartLabels);

   }

   showCountByAge(event: any)
{
  this.resetAgeValues();
  this.dataExists=false;
  for ( var i=0;i<this.ageFilters.length;i++)
  {
    this.pieChartLabels.push(this.ageFilters[i].fromAge + ' - ' + this.ageFilters[i].toAge);
    this.pieChartData[i]=0;
  }

for (var visit of this.visits) 
    {
  let ageCorrect=false;  

  visit.userData.age= this.birthdayToAge(visit.userData.birthDate)

      for ( var i=0;i<this.ageFilters.length;i++)
      {
        
        if(visit.userData.age>=this.ageFilters[i].fromAge && visit.userData.age<=this.ageFilters[i].toAge)
        {
        ageCorrect=true;
        }
        else
        {
          ageCorrect=false;
        }

        if(ageCorrect)
        { 
          this.pieChartData[i]++;     
        }
        this.ageCorrect=false;
      }


      
    }
      this.dataExists=true;
      console.log(this.pieChartLabels);
   }


   showSumByAge(event: any)
   {
     this.resetAgeValues();
     this.dataExists=false;
     this.pieChartData=[];
     for ( var i=0;i<this.ageFilters.length;i++)
     {
       this.pieChartLabels.push(this.ageFilters[i].fromAge + ' - ' + this.ageFilters[i].toAge);
       this.pieChartData[i]=0;
     }
   
   for (var visit of this.visits) 
       {
     let ageCorrect=false;  
   
     visit.userData.age= this.birthdayToAge(visit.userData.birthDate)
   
         for ( var i=0;i<this.ageFilters.length;i++)
         {
           
           if(visit.userData.age>=this.ageFilters[i].fromAge && visit.userData.age<=this.ageFilters[i].toAge)
           {
           ageCorrect=true;
           }
           else
           {
             ageCorrect=false;
           }
   
           if(ageCorrect)
           { 
             this.pieChartData[i]+=visit.spentSum;     
           }
           this.ageCorrect=false;
         }
   
   
         
       }
       this.pieChartData = this.pieChartData.map(e=> parseFloat(e.toFixed(2)))
         this.dataExists=true;
         console.log(this.pieChartLabels);
      }


showSum(event: any)
  {
    this.resetGenderValues();
for (var visit of this.visits) 
    {
      visit.userData.age= this.birthdayToAge(visit.userData.birthDate)
      let ageCorrect=false;
      for ( var i=0;i<this.ageFilters.length;i++)
      {
        
        if(visit.userData.age>=this.ageFilters[i].fromAge && visit.userData.age<=this.ageFilters[i].toAge)
        {
        ageCorrect=true;
        }
        else
        {
          ageCorrect=false;
        }

        if(ageCorrect)
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
    }
      }
      this.pieChartData = this.pieChartData.map(e=> parseFloat(e.toFixed(2)))
      this.dataExists=true;
      console.log(this.pieChartLabels);

  }
}
