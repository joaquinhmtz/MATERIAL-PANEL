import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable  } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API: string = environment.server;
  private data : any = null

  constructor(private http : HttpClient) { }


  HTTP_POST(endpoint: String, data: any):Observable<any>{
    return this.http
      .post(`${this.API}${endpoint}`,data)
      .pipe(catchError(this.handleError))
  }

  HTTP_POST_FILE(endpoint: String, data: any):Observable<any>{
    return this.http
      .post(`${this.API}${endpoint}`,data)
      .pipe(catchError(this.handleError))
  }

  HTTP_GET(endpoint: String, params?: any):Observable<any>{
    return this.http
      .get(`${this.API}${endpoint}`,{params:params})
      .pipe(catchError(this.handleError))
  }

  HTTP_PUT(endpoint: String, data: any):Observable<any>{
    return this.http
      .put(`${this.API}${endpoint}`,data)
      .pipe(catchError(this.handleError))
  }

  HTTP_DELETE(endpoint: String, data: any):Observable<any>{
    return this.http
      .delete(`${this.API}${endpoint}`,data)
      .pipe(catchError(this.handleError))
  }


  private handleError(error: HttpErrorResponse){
    if(error && error.status == 401)
      return throwError({ error: 'Tu sesión ha expirado o no tienes permisos para realizar esta acción.' });
    else if(error && error.status == 404)
      return throwError({ error: 'No se encontro el servicio solicitado' });
    else if(error && error.status == 500) {
      if (error.error.message === 'TokenExpiredError') return throwError({ error : 'TokenExpiredError' });
      else return throwError({ error: 'Ocurrió un problema con el servidor.' });
    } else return throwError(error);
  }
}
