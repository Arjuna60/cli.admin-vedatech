import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Bancos',
      icono: 'fa fa-bank (alias)',
      submenu: [
        { titulo: 'Graficas', url: '/usuarios' },
        { titulo: 'Alta Cuenta', url: '/bank' },
        { titulo: 'Ingresar Deposito', url: '/deposit' },
        { titulo: 'Ingresar Cheque', url: '/check' },
        { titulo: 'Movimientos', url: '/bankTransaction' },
        { titulo: 'Enviar Factura', url: '/sendinvoice' },
      ]
    },
    {
      titulo: 'Clientes',
      icono: 'fa fa-address-book (alias)',
      submenu: [
        { titulo: 'Alta de Cliente', url: '/addcustomer' },
        { titulo: 'Ventas x Cliente', url: '/reportsales' },
        { titulo: 'Agregar una factura', url: '/addinvoice' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' }
      ]
    },
    {
      titulo: 'Cuentas',
      icono: 'mdi mdi-book-multiple',
      submenu: [
        { titulo: 'Cuentas', url: '/accounts' },
        { titulo : 'Agregar Cuenta', url: '/addSubAccount' },
        { titulo: 'Editar Cuenta', url: '/editAccount' },
        { titulo: 'Borrar Cuenta', url: '/deleteAccount' }
      ]
    },
    {
      titulo: 'Catalogos',
      icono: 'mdi mdi-folder-upload',
      submenu: [
        { titulo: 'Envio de Archivos', url: '/catalogs' },
        { titulo : 'Bancos', url: '/catalog-bank' },
        { titulo: 'Movimientos Bancarios', url: '/catalog-trans' },
        { titulo: 'Proveedores', url: '/catalog-supplier' },
        { titulo: 'Clientes', url: '/catalog-customer' }

      ]
    },
  ];

  constructor() { }

}
