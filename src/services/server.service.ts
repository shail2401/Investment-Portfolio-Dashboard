import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Server } from '../models/server.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  options: { headers: HttpHeaders }
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9',
    });

    this.options = { headers: this.headers };
  }

  getServers(): Observable<any> {
    return this._http
      .get('http://localhost:5000/api/server')
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    const errorMsg =
      error.message || error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.log(errorMsg);

    // console.log(errorMsg);
    return throwError(() => new Error(errorMsg));
  }

  handleServerMessage(msg: any): Observable<any> {
    const url = 'http://localhost:5000/api/server/' + msg.id;
    return this._http.put(url, msg, this.options);
  }
}
