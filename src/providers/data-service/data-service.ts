import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'


@Injectable()
export class DataServiceProvider {

  headers: HttpHeaders

  constructor(private _http: HttpClient) {
    this.setHeaders()
   }

   get<T>(url: string, token: string): Observable<any>{
    const headers =  token ? this.headers.set('Authorization', 'Bearer ' + token) : this.headers
    return this._http.get<any>(url, { headers: headers })
  }

  post<T>(url: string, data: T, token: string): Observable<any>{
    const jsonData = JSON.stringify(data)
    const headers =  token ? this.headers.set('Authorization', 'Bearer ' + token) : this.headers
    return this._http.post(url, jsonData, { headers: headers})
  }

  put<T>(url: string, data: T, token: string): Observable<any>{
    const jsonData = JSON.stringify(data)
    const headers =  token ? this.headers.set('Authorization', 'Bearer ' + token) : this.headers
    return this._http.put(url, jsonData, { headers: headers })
  }	

  delete<T>(url: string, token: string): Observable<any>{
    const headers =  token ? this.headers.set('Authorization', 'Bearer ' + token) : this.headers
    return this._http.delete(url, { headers: headers })
  }

 
  private setHeaders() {
    this.headers = new HttpHeaders()
    this.headers.set('Accept', 'application/json')
    this.headers = this.headers.set('Content-Type', 'application/json')
  }

}
