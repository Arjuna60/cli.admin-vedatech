import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bank, BankTransaction } from '../../models/bank.model';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  usuario: Usuario;
  token: string;
  private urlEndPoint = URL_SERVICIOS;
  private urlEndUpdate = URL_SERVICIOS + '/api/bank';
  private httpHeaders = new HttpHeaders();
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

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

  create(cliente: Bank): Observable<Bank> {
    const url = URL_SERVICIOS + '/api/bank/addBankAccount/';
  // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
    // url += '?token=' + this.token;
    return this.http.post<Bank>(this.urlEndPoint + '/api/bank/addBankAccount/', cliente);
  }

  getAllAccounts(): Observable<Bank[]> {
      this.token = localStorage.getItem('token');
      console.log('TOKEN EN GETALLACCOUNTS ', this.token);
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
     // url += '?token=' + this.token;
     return this.http.get<Bank[]>(this.urlEndPoint + '/api/bank/getAllBankAccounts/', {headers: this.httpHeaders})
        .pipe(
         map(response => response as Bank[]),
         map(err =>  err) );
  }

  updateBankAccount(data: Bank): Observable<Bank> {
      console.log('Token', this.token);

    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.put<Bank>(`${this.urlEndUpdate}/${data.id}`, data, {headers: this.httpHeaders});
      // .pipe(
      //   map(response => response as BankAccount));
    }

    createTransaction(bankTransaction: BankTransaction): Observable<BankTransaction> {
      const url = URL_SERVICIOS + '/api/bank/addBankAccount/';
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.post<BankTransaction>(this.urlEndPoint +
         '/api/bank/add-bank-transaction/', bankTransaction, {headers: this.httpHeaders});
    }

    sendXmlInvoice(fileXml: File): Observable<any> {
      const url = URL_SERVICIOS + '/api/customer/sendXmlFile/';
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml', 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
      return this.http.post<any>(this.urlEndPoint +
         '/api/customer/send-xml-file', fileXml, {headers: this.httpHeaders});
    }

    // text/plain
    sendTxtFile(fileTxt: File): Observable<any> {
      const url = URL_SERVICIOS + '/api/bank/sendXmlFile/';
      const formdata: FormData = new FormData();
      formdata.append('file', fileTxt);

    this.httpHeaders = new HttpHeaders({'Content-Type': undefined, 'Authorization': 'Bearer ' + this.token});
      // url += '?token=' + this.token;
    //  return this.http.post<any>(this.urlEndPoint +
      //   '/api/bank/send-txt-file', fileTxt, {headers: this.httpHeaders});

         return this.http.post(this.urlEndPoint +
          '/api/bank/send-txt-file', formdata,{headers: this.httpHeaders});
    }

    // Otra opcion para mandar file
    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
   
      formdata.append('file', file);
   
      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/supplier-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(req);
    }
   
    getFiles(): Observable<any> {
      return this.http.get('/getallfiles');
    }
}
