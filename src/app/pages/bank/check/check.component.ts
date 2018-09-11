import { Component, OnInit, Injector } from '@angular/core';
import { Accounting, AccountingDetails } from '../../../models/accountingItem';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { Bank } from '../../../models/bank.model';
import swal from 'sweetalert';
import { BankService } from '../../../services/bank/bank.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier.model';
import { AccountService } from '../../../services/account/account.service';
import { AccountingType } from '../../../models/account.model';
import { log } from 'util';
import { Router } from '../../../../../node_modules/@angular/router';


export interface User {
  name: string;
}




@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  update: boolean = true;

  // tslint:disable-next-line:no-inferrable-types
  poliza: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  polizaAutomatic: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  isTax: boolean = true;

  // tslint:disable-next-line:no-inferrable-types
  totalCredit: number = 0;
 
  // tslint:disable-next-line:no-inferrable-types
  totalDebit: number = 0;
  
  // tslint:disable-next-line:no-inferrable-types
  totalAcc: boolean = true;

 
  banks = new Bank();

   bankTransaction = {

    date: '',
    dateOperation: '',
    reference: null,
    description: '',
    checkAmount: null,
    suppliers: {},
    bank: {},
    accountingDetails: [
      {
      id: null,
      accountingType: {
        id: null,
        nameAccount: '',
        typeAccount: '',
        detailType: '',
        numberAcount: ''
      },
      concept: '',
      credit: null,
      debit: null,
      total: null,

    }
  ],
   };

   autocomplete: [
     'auto1',
     'auto2'

   ];

  form: FormGroup;

  bank: Bank[];
  suppliers: Supplier[];
  accounts: AccountingType[];


  filteredOptions: Observable<User[]>;
  filteredSupplierOptions: Observable<Supplier[]>;
  filteredBankOptions: Observable<Bank[]>;
  filteredAccOptions: Observable<AccountingType[]>;
  date = new Date();
  // tslint:disable-next-line:no-inferrable-types
  itemIndex: number = 0;

  constructor(private fb: FormBuilder,
              private bankService: BankService,
              private supplierService: SupplierService,
              private accountService: AccountService,
              private injector: Injector) {

   
    this.createForm();
     this.addItem();
    // this.addItem(1);

    this.bankService.getAllAccounts().subscribe(
      result => {
        // this.bank = result;
        if (result != null) {
          this.bank = result;
        } else {
          const router = this.injector.get(Router);
          router.navigate(['/bank']);
          swal('Mensaje!', `Necesita crear una cuenta Bancaria`, 'warning');
        }
      }
    );

    this.supplierService.getAllSuppliers().subscribe(
      res => {
        // this.bank = result;
        if (res != null) {
          this.suppliers = res;
        } else {
          const router = this.injector.get(Router);
          router.navigate(['/bank']);
          swal('Mensaje!', `No existen Proveedores crear uno`, 'warning');
        }
      }
    );

    this.accountService.getAllAccounts().subscribe(
      res => this.accounts = res
    );

  }


  ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.form.controls['date'].setValue(currentDate);
    this.form.controls['dateOperation'].setValue(currentDate);
    // this.form.get('date').setValue(this.date);
    // this.banks.name = 'Serfin Santander';
    this.banks = this.form.get('bank').value;

  }



  get addItemArr(): FormArray {
    return this.form.get('accountingDetails') as FormArray;
}


addItem() {
  //  this.itemIndex = term;
  this.addItemArr.push(this.fb.group(new AccountingDetails()));
  //  this.ngOnInit();
    this.calculate();
}

removeItem(item) {
const i = this.addItemArr.controls.indexOf(item);
console.log('Valor de i ', i);

}


  filterBank() {
    console.log('Filter Bank');

    this.filteredBankOptions = this.form.get('bank').valueChanges
    .pipe(
      startWith<string | Bank>(''),
      map(value => typeof value === 'string' ? value : value.nameBank),
      map(name => name ? this._filterBank(name) : this.bank.slice())
    );

  }

  filterSupplier() {
    console.log('Filter Supplier');

    this.filteredSupplierOptions = this.form.get('suppliers').valueChanges
    .pipe(
      startWith<string | Supplier>(''),
      map(value => typeof value === 'string' ? value : value.nameSupplier),
      map(name => name ? this._filterSupplier(name) : this.suppliers.slice())
    );

  }


  filterAcc() {

    this.filteredAccOptions = this.addItemArr.controls[this.itemIndex].get('accountingType').valueChanges
    .pipe(
    startWith<string | AccountingType>(''),
    map(value =>  typeof value === 'string' ? value : value.nameAccount),
    map(name => name ? this._filterAcc(name) : this.accounts.slice())
    );

  }


  displayBankFn(bank?: Bank): string | undefined {
    // console.log('display ', bank);
    return bank ? bank.nameBank : undefined;
  }

  displaySupplierFn(supp?: Supplier): string | undefined {
    return supp ? supp.nameSupplier : undefined;
  }

  displayAccFn(acc?: AccountingType): string | undefined {
    return acc ? acc.nameAccount : undefined;
  }

 
  private _filterBank(name: string): Bank[] {
    console.log('name', name);
    this.banks = this.form.get('bank').value;
    const filterBankValue = name.toLowerCase();
    return this.bank.filter(option => option.nameBank.toLowerCase().indexOf(filterBankValue) === 0);
  }

  private _filterSupplier(name: string): Supplier[] {
    console.log('name', name);
  //  this.suppliers = this.form.get('supplier').value;
    const filterSupplierValue = name.toLowerCase();
    return this.suppliers.filter(option => option.nameSupplier.toLowerCase().indexOf(filterSupplierValue) === 0);
  }


  private _filterAcc(name: string): AccountingType[] {
    console.log('NAME IN FILTER ', name);
    const filterAccValue = name.toLowerCase();
    // this.searchAccountByName(filterAccValue);
    // console.log('ACCOUNTS IN FILTER ', this.accounts);

    return this.accounts.filter(option => option.nameAccount.toLowerCase().indexOf(filterAccValue) === 0);
  }

  createForm() {

    this.form = this.fb.group({

        suppliers: new FormControl('', [Validators.required]),
        bank: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        dateOperation: new FormControl('', [Validators.required]),
        reference: new FormControl('', [Validators.required]),
        description: new FormControl(),
        checkAmount: new FormControl('', [Validators.required]),
        accountingDetails: this.fb.array([]),

    });

   
    }

    addPolizaAutom() {

      // Desabilita el boton de poliza

      if (this.form.get('bank').invalid 
      || this.form.get('suppliers').invalid || this.form.get('checkAmount').invalid
      || this.form.get('reference').invalid) {
        swal('Mensaje!', `Llene todos los datos para realizar la poliza`, 'warning');
        return;
      }

      this.polizaAutomatic = true;
      let cheque = this.form.get('checkAmount').value;


      // Se agrega el primer item de la poliza

     // this.addItem();
      const data = this.form.get('bank').value.accountingType;
      this.addItemArr.controls[0].get('accountingType').setValue(data);
      this.addItemArr.controls[0].get('debit').setValue(0);
      this.addItemArr.controls[0].get('credit').setValue(cheque);
      console.log('Data ', data);

      // Se agrega el segunto item de la poliza en el debito

      this.addItem();
      const supp = this.form.get('suppliers').value.accountingType;
      this.addItemArr.controls[1].get('accountingType').setValue(supp);
      this.addItemArr.controls[1].get('debit').setValue(cheque);

      if ( Boolean(this.form.get('suppliers').value.taxes) ) {

        // se llena la poliza con el iva

        this.addItem();
        cheque = cheque / 1.16;
        const number = Math.round( cheque * 100 + Number.EPSILON ) / 100;
        this.addItemArr.controls[1].get('debit').setValue(number);
        const taxAccount = this.accounts[3];
        this.addItemArr.controls[2].get('accountingType').setValue(taxAccount);
        const dif = this.addItemArr.controls[0].get('credit').value
        - this.addItemArr.controls[1].get('debit').value;
        const difnumber = Math.round( dif * 100 + Number.EPSILON ) / 100;
        this.addItemArr.controls[2].get('debit').setValue(difnumber);

      }

      this.poliza = true;

      this.calculate();

    }

    // Generar Poliza Manual

    addPolizaManual() {

       // Desabilita el boton de poliza

       if (this.form.get('bank').invalid 
       || this.form.get('suppliers').invalid || this.form.get('checkAmount').invalid
       || this.form.get('reference').invalid) {
         swal('Mensaje!', `Llene todos los datos para realizar la poliza`, 'warning');
         return;
       }

       this.polizaAutomatic = false;
       const cheque = this.form.get('checkAmount').value;


       // Se agrega el primer item de la poliza

      // this.addItem();
       const data = this.form.get('bank').value.accountingType;
       this.addItemArr.controls[0].get('accountingType').setValue(data);
       this.addItemArr.controls[0].get('debit').setValue(0);
       this.addItemArr.controls[0].get('credit').setValue(cheque);
       console.log('Data ', data);

       this.form.get('accountingDetails').valueChanges.subscribe(
         result => {
           this.calculate();
         }
       );

    }

      //  Funcion que calucla las sumas de Credito y Debito, si hay diferencia manda error

    calculate() {

      this.totalCredit = 0;
      this.totalDebit = 0;
      console.log('Array Length ', this.addItemArr.length);

          for (let i = 0; i < this.addItemArr.length; i++) {

              this.totalDebit = this.totalDebit + this.addItemArr.controls[i].get('debit').value;
              this.totalCredit = this.totalCredit + this.addItemArr.controls[i].get('credit').value;
              console.log('Credit ', this.totalCredit);
              console.log('Debit ', this.totalDebit );

                  const difAbs = Math.abs(this.totalCredit - this.totalDebit);
                  const err = 0.001;
                  console.log('difAbs ', difAbs);

                  if (err < difAbs) {

                      this.form.controls['accountingDetails'].setErrors({'incorrect': true});
                      this.totalAcc = true;
                      console.log('error true');

                  } else {

                  this.form.controls['accountingDetails'].setErrors(null);
                  this.totalAcc = false;
                  console.log('error false');

                  }

          }

          console.log('This form', this.form);

     }


    save() {

      console.log(this.form);
      if (this.totalAcc) {
        console.log('Error en las sumas');
        swal('Mensaje!', `La poliza tiene diferencias`, 'warning');

          return;
      }


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

      this.bankService.createTransaction(data).subscribe( res => {
        console.log(res);
         swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');

       this.cleanForm();
      },
     error => {
       console.log(error, '  / ', error.error);
       swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.reference} ya existe `, 'error');

     }
  );
    }

    // Limpiar Forma

    cleanForm() {
      const leng = this.addItemArr.length;
      console.log('long ', leng);

      console.log('Valor de ADD ItemArr ', this.addItemArr);
      for ( let i = 0; i < leng; i++) {
        console.log('Valor de i ', i);
        this.addItemArr.removeAt(1);
        console.log('Valor de ADD ItemArr DENTRO DE FOR ', this.addItemArr);

       }
       console.log('This form despues de borrar items ', this.form);

       this.form.setValue(this.bankTransaction);
       this.form.get('reference').setValue(0);
       this.update = true;
       // tslint:disable-next-line:no-inferrable-types
       this.totalCredit = 0;
       // tslint:disable-next-line:no-inferrable-types
       this.totalDebit = 0;
       // tslint:disable-next-line:no-inferrable-types
       this.totalAcc = true;
   

    this.banks = new Bank();
        const currentDate = new Date().toISOString().substring(0, 10);
        this.form.controls['date'].setValue(currentDate);
        this.form.controls['dateOperation'].setValue(currentDate);
        this.poliza = false;
        this.polizaAutomatic = false;

    }


    cargardatos() {

      this.bankService.getAllAccounts().subscribe(
        result => {
        if ( result != null ) {
          this.bank = result;
        } else {
          const router = this.injector.get(Router);
          router.navigate(['/bank']);
          swal('Mensaje del Servidor:', 'Necesita crear una cuenta Bancaria', 'error');
        }

        });

    }

    loadSupplier() {

      this.supplierService.getAllSuppliers().subscribe(
        res => this.suppliers = res
      );
          console.log('Suppliers ', this.suppliers);
          this.loadAccount();
        }

    loadAccount() {

      this.accountService.getAllAccounts().subscribe(
            res => this.accounts = res
          );
              console.log('Accounts ', this.accounts);

        }

        searchAccountByName(term) {
          this.accountService.searchAccountByName(term).subscribe(
            res => this.accounts = res
          );
          console.log('Search by Name ', this.accounts);

        }

}
