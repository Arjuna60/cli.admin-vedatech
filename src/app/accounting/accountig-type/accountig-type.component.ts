import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { AccountingType, AccountingTypeTwo } from '../../models/account.model';

@Component({
  selector: 'app-accountig-type',
  templateUrl: './accountig-type.component.html',
  styleUrls: ['./accountig-type.component.css']
})
export class AccountigTypeComponent implements OnInit {

  accounts: AccountingTypeTwo[];

  constructor(private account_service: AccountService) {
    this.getAllAccounts();
   }

  ngOnInit() {

    this.getAllAccounts();
  }

  getAllAccounts() {
    this.account_service.getAllAccounts2().subscribe(
      res => this.accounts = res
    );
      console.log('Accounts ' , this.accounts);
      this.allAccounts();
  }

  allAccounts() {
    
      console.log("En el metodo ", this.accounts);
      

    
  }

}
