import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyRadarChartComponent } from './my-radar-chart/my-radar-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { MyVisitsComponent } from './my-visits/my-visits.component';
import { VisitLineChartComponent } from './visit-line-chart/visit-line-chart.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


const routes: Routes = [
  {path: 'bar-chart', component: MyBarChartComponent},
  {path: 'doughnut-chart', component: MyDoughnutChartComponent},
  {path: 'radar-chart', component: MyRadarChartComponent},
  {path: 'pie-chart', component: MyPieChartComponent},
  {path: 'visits', component: MyVisitsComponent},
  {path : 'line-chart', component: VisitLineChartComponent},
  {path: '**', component: MyBarChartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyBarChartComponent,
    MyDoughnutChartComponent,
    MyRadarChartComponent,
    MyPieChartComponent,
    MyVisitsComponent,
    VisitLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
