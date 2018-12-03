import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BankComponent } from '../bank/bank.component';
import { DepositComponent } from '../bank/deposit/deposit.component';
import { CheckComponent } from '../bank/check/check.component';
import { BankMovementsComponent } from '../bank/bank-movements/bank-movements.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule,
     MatFormFieldModule, MatNativeDateModule,
     MatDatepickerModule, MatButtonModule,
     MatInputModule, MatSelectModule,
     MatRippleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PAGES_ROUTES } from '../pages.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SubaccountComponent } from '../accounting/subaccount/subaccount.component';



@NgModule({
    declarations: [
        BankComponent,
        DepositComponent,
        CheckComponent,
        InvoicesComponent,
        BankMovementsComponent,
        SubaccountComponent
    ],
    exports: [
        BankComponent,
        DepositComponent,
        CheckComponent,
        BankMovementsComponent,
        SubaccountComponent
    ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatRippleModule,
      //  SharedModule,
        PAGES_ROUTES,
        BrowserModule,
        ChartsModule,
      //  PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]

})
export class BankModule { }
