import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { AccountType, SubAccount } from '../../../models/account.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-subaccount',
  templateUrl: './subaccount.component.html',
  styleUrls: ['./subaccount.component.css']
})
export class SubaccountComponent implements OnInit {

  form: FormGroup;
  accounts: AccountType[];
  subAccount = {
    'id': null,
    'nameAccount': '',
    'accountNumber': '',
    'balance': 0.00,
    'accountType': ''

  }
  filteredAccOptions: Observable<AccountType[]>;


  constructor( private fb: FormBuilder,
               private accountService: AccountService) {
      this.createForm();
      this.accountService.getAllAccountsType().subscribe(
        res => this.accounts = res
      );
          console.log('Accounts ', this.accounts);
    }


  ngOnInit() {
  }

//  Create Form

  createForm() {
    this.form = new FormGroup({
      'id': new FormControl(),
      'nameAccount': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'accountNumber': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+')]),
      'balance': new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)')]),
      'accountType': new FormControl('', [Validators.required])
    });
  }

  loadAccount() {
    this.accountService.getAllAccountsType().subscribe(
          res => this.accounts = res
        );
            console.log('Accounts ', this.accounts);
      }

      filterAcc() {
            this.filteredAccOptions = this.form.get('accountType').valueChanges
            .pipe(
            startWith<string | AccountType>(''),
            map(value =>  typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterAcc(name) : this.accounts.slice())
            );
        }

      private _filterAcc(name: String): AccountType[] {
        const filterAccValue = name.toLowerCase();
        return this.accounts.filter(option => option.name.toLowerCase().indexOf(filterAccValue) === 0);
      }

      displayAccFn(acc?: AccountType): String | undefined {
        return acc ? acc.name : undefined;
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

        create(data) {
          this.accountService.create(data).subscribe( res => {
            console.log('Valor recibido', res);
             swal('Mensaje del Servidor...', `La cuenta de se guardo con exito`, 'success');
             this.form.setValue(this.subAccount);
         //    this.getAllBankAccounts();
              },
                 error => {
                   console.log(error, '  / ', error.error);
                   swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.accountNumber} ya existe `, 'error');
                 }
            );
        }




}
