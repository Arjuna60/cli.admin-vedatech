import { Component, OnInit } from '@angular/core';
import { BankTransactionService } from '../../../services/bank/bankTransaction.service';
import { BankTransaction, BankTransactionsTwo } from '../../../models/bank.model';

@Component({
  selector: 'app-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.css']
})
export class BankTransactionsComponent implements OnInit {

  bankTransaction: BankTransactionsTwo[];

  constructor(private bankTransactionService: BankTransactionService ) { }

  ngOnInit() {
    this.getAllBankAccountsTransaction();
  }

  getAllBankAccountsTransaction() {
    this.bankTransactionService.getAllBankAccountTransaction()
    .subscribe(bankTrans => {
      // tslint:disable-next-line:semicolon
       this.bankTransaction = bankTrans

      }
    );
  }


}
