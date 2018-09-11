import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankService } from '../../services/bank/bank.service';
import swal from 'sweetalert';
import { Bank } from '../../models/bank.model';
import { AccountService } from '../../services/service.index';
import { AccountingType } from '../../models/account.model';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

   form: FormGroup;
   bankaccounts: Bank[];

   // tslint:disable-next-line:no-inferrable-types
   total: number = 0;
   // tslint:disable-next-line:no-inferrable-types
   update: boolean = true;

   bankAccount = {
      'id': null,
      'accountingType': {},
     'nameBank': '',
     'accountNumber': '',
     'address': '',
     'email': '',
     'phone': '',
     'observation': '',
     'balance': 0.00
   };


   accounts: AccountingType[];
   filteredAccOptions: Observable<AccountingType[]>;



  constructor(private fb: FormBuilder,
              private bankService: BankService,
               private accountService: AccountService,
               private injector: Injector) {
    this.createForm();
    this.accountService.getAllAccounts().subscribe(
      res => this.accounts = res
    );

  }

  ngOnInit() {
    this.getAllBankAccounts();
  }

   createForm() {
     this.form = new FormGroup({
       'id': new FormControl(),
       'accountingType': new FormControl('', [Validators.required]),
       'nameBank': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'accountNumber': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+')]),
       'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       'phone': new FormControl('', Validators.required),
       'address': new FormControl('', Validators.required),
       'observation': new FormControl('', Validators.required),
       'balance': new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)')])

   });

   }

  save() {
    console.log('SAVE ITEMS');
    console.log('THIS FORM: ', this.form);
      // tslint:disable-next-line:prefer-const
      let data = JSON.stringify(this.form.value);
      console.log('-----Team in JSON Format-----');
      console.log(data);
      // tslint:disable-next-line:prefer-const
      let jsonData = JSON.parse(data);
      console.log('jsonData ', jsonData);
      // console.log(jsonData.invoiceItems[0].qty);

       this.create(jsonData);
    }

        updateForm() {
          console.log('UPDATE THIS ITEMS');

         console.log('THIS FORM: ', this.form);
           // tslint:disable-next-line:prefer-const
           let data = JSON.stringify(this.form.value);
           console.log('-----Team in JSON Format-----');
           console.log(data);
           // tslint:disable-next-line:prefer-const
           let jsonData = JSON.parse(data);
           console.log('jsonData ', jsonData);
           // console.log(jsonData.invoiceItems[0].qty);
            this.updateBank(jsonData);

          }



        create(data) {

          this.bankService.create(data).subscribe( res => {
            console.log('Valor recibido', res);
             swal('Mensaje del Servidor...', `La cuenta de ${res.nameBank}: ${res.accountNumber} se guardo con exito`, 'success');
             this.form.setValue(this.bankAccount);
             this.getAllBankAccounts();
          },
         error => {
           console.log(error, '  / ', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.accountNumber} ya existe `, 'error');

         }
      );
        }

        updateBank(data) {
          console.log('INSIDE OF UPDATE');

          this.bankService.updateBankAccount(data).subscribe( res => {
            console.log(res);
             swal('Mensaje del Servidor...', `La cuenta de ${res.nameBank}: ${res.accountNumber} se actualizo con exito`, 'success');
             this.bankAccount = {
              'id': null,
              'accountingType': {},
             'nameBank': '',
             'accountNumber': '',
             'address': '',
             'email': '',
             'phone': '',
             'observation': '',
             'balance': null
           };
             this.update = true;
             this.form.setValue(this.bankAccount);
             this.getAllBankAccounts();
          },
         error => {
           console.log(error, '  / ', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.accountNumber} ya existe `, 'error');

         }
      );
        }

        getAllBankAccounts() {

          this.bankService.getAllAccounts()
          .subscribe(bankaccounts => {

            // tslint:disable-next-line:semicolon
             this.bankaccounts = bankaccounts
             if (this.bankaccounts != null) {
                this.calcTotal();
             }
            }


          );

          }

        calcTotal() {
        this.total = 0.00;

              for ( let i = 0; i < this.bankaccounts.length; i ++) {

                this.total = this.total + this.bankaccounts[i].balance;
              }

        console.log('Total ', this.total);


        }

        select(id) {
        console.log('Id', id);

        for (let i = 0; i < this.bankaccounts.length; i++) {

          if ( id === this.bankaccounts[i].id) {
            this.bankAccount = this.bankaccounts[i];
          }
        }
              console.log('bankAccount ', this.bankAccount);
              this.update = false;
              this.form.setValue(this.bankAccount);

        }

        loadAccount() {

          this.accountService.getAllAccounts().subscribe(
                res => this.accounts = res
              );
                  console.log('Accounts ', this.accounts);

            }

            filterAcc() {

              this.filteredAccOptions = this.form.get('accountingType').valueChanges
              .pipe(
              startWith<string | AccountingType>(''),
              map(value =>  typeof value === 'string' ? value : value.nameAccount),
              map(name => name ? this._filterAcc(name) : this.accounts.slice())
              );

            }

            private _filterAcc(name: string): AccountingType[] {
              const filterAccValue = name.toLowerCase();
              return this.accounts.filter(option => option.nameAccount.toLowerCase().indexOf(filterAccValue) === 0);
            }


            displayAccFn(acc?: AccountingType): string | undefined {
              return acc ? acc.nameAccount : undefined;
            }

            clear() {

              this.bankAccount = {
                'id': null,
                'accountingType': {},
               'nameBank': '',
               'accountNumber': '',
               'address': '',
               'email': '',
               'phone': '',
               'observation': '',
               'balance': null
             };

             this.form.setValue(this.bankAccount);
             this.update = true;
            }





}
