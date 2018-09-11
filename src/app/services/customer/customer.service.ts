import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Supplier } from '../../models/supplier.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Customer } from '../../models/customer.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint = URL_SERVICIOS + '/api/customer';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {

      return this.http.get<Customer[]>(this.urlEndPoint + '/getAllCustomers/')
      .pipe(
        map(response => response as Customer[]));
    }

}
