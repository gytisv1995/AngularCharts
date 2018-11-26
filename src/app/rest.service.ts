import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:53701/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
 
  getVisits(CompanyId:string, PinId:string, UserId:string,  DateFrom:string, DateTo:string, Gender:string,
  LoyaltyLevel:string, PointsTo:string, SmallDiscount:string): Observable<any> {
    let params = new HttpParams().set("CompanyId",CompanyId).set("PinId", PinId).set("UserId",UserId).set("DateFrom",DateFrom)
    .set("DateTo",DateTo).set("Gender",Gender).set("LoyaltyLevel",LoyaltyLevel).set("PointsTo",PointsTo)
    .set("SmallDiscount",SmallDiscount);
    return this.http.get(endpoint + 'Analysis/Visits',{params: params}).pipe(
      map(this.extractData));
  }

  
}
