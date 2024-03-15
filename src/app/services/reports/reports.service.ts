import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private url = 'http://15.185.46.105:5100/api';
 
  constructor(private http: HttpClient) { }

  getActiveAgreements() { 
    return this.http.get(this.url + '/report/activeAgreements')
  }

  getInactiveAgreements() { 
    return this.http.get(this.url + '/report/inactiveAgreements')
  }

}
