import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { MyVisitsComponent } from './my-visits/my-visits.component';
import { VisitLineChartComponent } from './visit-line-chart/visit-line-chart.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


const routes: Routes = [
  {path: 'visits', component: MyVisitsComponent},
  {path : 'line-chart', component: VisitLineChartComponent},
];

@NgModule({
  declarations: [
    AppComponent,
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
