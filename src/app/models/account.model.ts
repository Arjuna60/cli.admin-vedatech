import { TOKEN_NAME } from '../services/usuario/usuario.service';


export class AccountingType {

    public id: number;
    public nameAccount: string;
    public numberAccount: string;
    public typeAccount: string;
    public detailType: string;
}

export class AccountingTypeTwo {
    public id: number;
    public accountName: string;
    public accountNumber: string;
    public details: string;
    public balance: number;
    public new: boolean;
}

export class AccountType {
    public name: string;
    public account: string ;
    public balance: number;
}

export class SubAccount {

    public id: number;
    public nameAccount: String;
    public accountNumber: String;
    public balance: number;
    public AccountingType: {};
}
