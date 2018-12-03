import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank/bank.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

 selectedFile1: File = null;

  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;
  selectedFile: File;

  constructor(private _bankService: BankService) { }

 
  ngOnInit() {
  }

  onFileSelected(event) {
    console.log('This file', event);
    this.selectedFile1 = <File>event.target.files[0];
    console.log('Selected File ', this.selectedFile1);
    this.selectedFile = <File>event.target.files[0];

  }

  onUploadFile() {
  console.log('LISTO PARA SER ENVIADO');
  this.currentFileUpload = this.selectedFile;

  const fd = new FormData();
  fd.append('file', this.selectedFile1, this.selectedFile1.name);
  console.log('FILE TO BE SEND ', this.selectedFile1.name);

    this._bankService.sendXmlInvoice(this.selectedFile1).subscribe(
      res => {
        console.log(res);

      }
    );
  }

  onUploadTxtFile() {
    console.log('LISTO PARA SER ENVIADO');
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log('FILE TO BE SEND ', this.selectedFile.name);
  
      this._bankService.pushFileToStorage(this.selectedFile).subscribe(
        res => {
          console.log(res);
  
        }
      );


      this.progress.percentage = 0;
 
      this.currentFileUpload = this.selectedFile;
      this._bankService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
   
      this.selectedFile = undefined;
    }



}
