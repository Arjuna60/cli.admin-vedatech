import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountingType } from '../../models/account.model';
import { BankTransaction } from '../../models/bank.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS;
  private httpHeaders = new HttpHeaders();
 

  constructor(private http: HttpClient) { this.cargarStorage()}

  cargarStorage() {
      if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        console.log('Token en bankService ', this.token);
        this.usuario = JSON.parse( localStorage.getItem('user') );
      } else {
        this.token = '';
        this.usuario = null;
      }
    }



    //  Send AccountingType File format CSV

     sendAccountTypeCatalog(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
         formdata.append('file', file);
         const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/accounting-type-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }


     //  Send Bank Transactions File format CSV
    
     sendBankTransactionCatalog(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
         formdata.append('file', file);
         const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/bank-transaction-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }
  
  }
