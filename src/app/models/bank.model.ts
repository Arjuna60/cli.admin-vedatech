
export class Bank {

    public id: number;
  //  public accountingType: {};
    public subAccount: {};
    public nameBank: string;
    public accountNumber: string;
    public address: string;
    public email: string;
    public phone: string;
    public observation: string;
    public balance: number;

}

export class BankTransaction {

    public id: number;
    public date: Date;
    public dateOperation: Date;
    public reference: number;
    public description: String;
    public depositAmount: number;
    public checkAmount: number;
    public balance: number;
    public bank: {};
    public accountingDetails: [
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
    ];
    public suppliers: {};


}

export class BankTransactionsTwo {

    public fechaOperacion: Date;
    public fecha: Date;
    public referencia: String;
    public descrip: String;
    public codigoTrans: String;
    public sucursal: String;
    public deposito: number;
    public retiro: number;
    public saldo: number;
    public movimiento: String;
    public descripcionDetalle: String;

}


