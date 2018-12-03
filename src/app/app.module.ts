import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/modules/pages.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';
import { ErrorService } from './error.service';



// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { AuthRequestOptions } from './auth-request';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountigTypeComponent } from './accounting/accountig-type/accountig-type.component';
import { BankTransactionsComponent } from './pages/bank/bank-transactions/bank-transactions.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountigTypeComponent,
    BankTransactionsComponent,
    AccountingComponent,
    CatalogsComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    // ErrorService
  ],
  providers: [
    ErrorService,
    {
      provide: ErrorHandler,
      useClass: ErrorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestOptions,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
