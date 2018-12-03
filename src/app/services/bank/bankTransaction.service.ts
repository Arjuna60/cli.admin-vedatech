import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankTransactionsTwo } from '../../models/bank.model';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';




@Injectable({
    providedIn: 'root'
  })
  export class BankTransactionService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS;
  private urlEndUpdate = URL_SERVICIOS + '/api/bank';
  private httpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {  this.cargarStorage(); }

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



        //   Functions of BankTransaction

      getAllBankAccountTransaction(): Observable<BankTransactionsTwo[]> {
        this.token = localStorage.getItem('token');
        console.log('TOKEN EN GETALLACCOUNTS ', this.token);
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
       // url += '?token=' + this.token;
       return this.http.get<BankTransactionsTwo[]>(this.urlEndPoint + '/api/bank/getAllBankTransaction/', {headers: this.httpHeaders})
          .pipe(
           map(response => response as BankTransactionsTwo[]),
           map(err =>  err) );
    }

  }
