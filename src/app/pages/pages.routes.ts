import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

import { ProfileComponent } from './profile/profile.component';


import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BankComponent } from './bank/bank.component';
import { CheckComponent } from './bank/check/check.component';
import { DepositComponent } from './bank/deposit/deposit.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { Customer } from '../models/customer.models';
import { AccountigTypeComponent } from '../accounting/accountig-type/accountig-type.component';
import { BankTransaction } from '../models/bank.model';
import { BankTransactionsComponent } from './bank/bank-transactions/bank-transactions.component';
import { AccountingComponent } from './accounting/accounting.component';
import { SubaccountComponent } from './accounting/subaccount/subaccount.component';
import { CatalogsComponent } from './catalogs/catalogs.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
       canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'bank', component: BankComponent, data: { titulo: 'Seccion Bancos' } },
            { path: 'check', component: CheckComponent, data: { titulo: 'Agregar Cheque' } },
            { path: 'deposit', component: DepositComponent, data: { titulo: 'Agregar Deposito' } },
             { path: 'sendinvoice', component: InvoicesComponent, data: { titulo: 'Enviar Factura XML' } },
            { path: 'addcustomer', component: Customer, data: { titulo: 'Dar de alta Cliente' } },
            { path: 'accounts', component: AccountigTypeComponent, data: { titulo: 'Cuentas' } },
            { path: 'bankTransaction', component: BankTransactionsComponent, data: { titulo: 'Movimientos de Cuentas' } },
            { path: 'addSubAccount', component: SubaccountComponent, data: { titulo: 'Cuentas Auxiliares' } },
            { path: 'catalogs', component: CatalogsComponent, data: { titulo: 'Subir Archivos CVS para ser enviados' } },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }

];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
