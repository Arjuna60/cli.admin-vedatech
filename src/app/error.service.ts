import {ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    // console.log('ERROR EN ERROR SERVICE ', error);

    if (error.status === 401 || error.status === 403) {
      router.navigate(['/login']);
  }

  if (error.status === 404) {
    console.log('ERROR 404 ', error);
    swal('Mensaje del Servidor:', `El Cliente no existe ${error.error.nameCustomer} desea darlo de alta`, 'error');

  }

  if (error.status === 417) {
    console.log('ERROR 417 ', error);
    swal('Mensaje del Servidor:', `${error.error} `, 'error');
    router.navigate(['/catalogs']);
  }
  
    // A client-side or network error occurred.
    console.error('An error occurred:', error);
    //  router.navigate(['/login']);


}

}
