import { Injectable } from '@angular/core';
import { AccountingType, AccountingTypeTwo, SubAccount, AccountType } from '../../models/account.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS + '/api/account';
  private httpHeaders = new HttpHeaders();


  constructor(private http: HttpClient) {
     this.cargarStorage();
    }

  cargarStorage() {
    console.log('TOKEN', this.token);
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('user') );
      console.log('TOKEN5', this.token);
        } else {
          this.token = '';
          this.usuario = null;
        }
  }

  create(subAccount: SubAccount): Observable<SubAccount> {
    const url = URL_SERVICIOS + '/api/bank/addBankAccount/';
  // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
    // url += '?token=' + this.token;
    return this.http.post<SubAccount>(this.urlEndPoint + '/addSubAccount/', subAccount);
  }

  // agregar: , {headers: this.httpHeaders}
  getAllAccounts(): Observable<AccountingType[]> {
    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.get<AccountingType[]>(this.urlEndPoint + '/getAllAccounts/')
      .pipe(
        map(response => response as AccountingType[]));
    }

    getAllAccountsType(): Observable<AccountType[]> {
      // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
        // url += '?token=' + this.token;
        return this.http.get<AccountType[]>(this.urlEndPoint + '/getAllAccountsType/')
        .pipe(
          map(response => response as AccountType[]));
      }
  

     // agregar: , {headers: this.httpHeaders}
     getAllSubAccounts(): Observable<SubAccount[]> {
    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.get<SubAccount[]>(this.urlEndPoint + '/getAllSubAccounts/')
      .pipe(
        map(response => response as SubAccount[]));
    }


  // agregar: , {headers: this.httpHeaders}
  getAllAccounts2(): Observable<AccountingTypeTwo[]> {
    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.get<AccountingTypeTwo[]>(this.urlEndPoint + '/getAllAccounts/')
      .pipe(
        map(response => response as AccountingTypeTwo[]));
    }


    searchAccountByName(term): Observable<AccountingType[]> {
      return this.http.get<AccountingType[]>(this.urlEndPoint + '/load-accounting-type/{term}')
      .pipe(
        map(response => response as AccountingType[]));
    }


}
