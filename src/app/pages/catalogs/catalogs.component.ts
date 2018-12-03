import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { CatalogsService } from '../../services/catalogs/catalogs.service';


@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {
  selectedFile1: File;
  selectedFile2: File;
  selectedFile3: File;
  selectedFile4: File;
  selectedFile5: File;

  fileName1: string = '';
  fileName2: string = '';
  fileName3: string = '';
  fileName4: string = '';
  fileName5: string = '';

  

  progress1: { percentage1: number } = { percentage1: 0 };
  progress2: { percentage2: number } = { percentage2: 0 };
  progress3: { percentage3: number } = { percentage3: 0 };
  progress4: { percentage4: number } = { percentage4: 0 };
  progress5: { percentage5: number } = { percentage5: 0 };

  currentFileUpload: File = null;
  selectedFile: File;
  infoColor = 'alert alert-info';
  textColor = 'text-info';


  constructor(private _catalogService:CatalogsService) { }

  ngOnInit() {
    this.selectedFile1 = null;

  }

  onAccountTypeFileSelected(event) {
    console.log('This file', event);
    this.selectedFile1 = <File>event.target.files[0];
    console.log('Selected File ', this.selectedFile1);
    this.selectedFile1 = <File>event.target.files[0];
    this.fileName1 = this.selectedFile1.name;
    event.srcElement.value = null;
    this.progress1.percentage1 = 0;


  }

  onBankTransFileSelected(event) {
    console.log('This file', event);
    this.selectedFile2 = <File>event.target.files[0];
    console.log('Selected File ', this.selectedFile2);
    this.selectedFile2 = <File>event.target.files[0];
    this.fileName2 = this.selectedFile2.name;
    event.srcElement.value = null;
    this.progress2.percentage2 = 0;

  }


  onUploadFile() {
  console.log('LISTO PARA SER ENVIADO');
  this.currentFileUpload = this.selectedFile;

  const fd = new FormData();
  fd.append('file', this.selectedFile1, this.selectedFile1.name);
  console.log('FILE TO BE SEND ', this.selectedFile1.name);

  }

  onBankTransFileSelectedcopy() {
    console.log('LISTO PARA SER ENVIADO');
    this.currentFileUpload = this.selectedFile;
  
    const fd = new FormData();
    fd.append('file', this.selectedFile1, this.selectedFile1.name);
    console.log('FILE TO BE SEND ', this.selectedFile1.name);
  
    }

  onUploadAccountingTypeFile() {
    console.log('LISTO PARA SER ENVIADO');
    const fd = new FormData();
    fd.append('file', this.selectedFile1, this.selectedFile1.name);
    console.log('FILE TO BE SEND ', this.selectedFile1.name);
       this.progress1.percentage1 = 0;
       this.currentFileUpload = this.selectedFile1;
      this._catalogService.sendAccountTypeCatalog(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress1.percentage1 = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          swal('Mensaje del Servidor:', `El Archivo se ha cargado correctamente`, 'success');
          this.selectedFile1 = undefined;
          this.fileName1 = '';
          this.progress1.percentage1 = 0;
        }
      });
      this.selectedFile1 = undefined;
      this.fileName1 = '';
    }

    onUploadBankTransactionFile() {
      console.log('LISTO PARA SER ENVIADO');
      const fd = new FormData();
      fd.append('file', this.selectedFile2, this.selectedFile2.name);
      console.log('FILE TO BE SEND ', this.selectedFile2.name);
         this.progress2.percentage2 = 0;
         this.currentFileUpload = this.selectedFile2;
        this._catalogService.sendBankTransactionCatalog(this.currentFileUpload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress2.percentage2 = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!', HttpResponse);
            swal('Mensaje del Servidor:', `El Archivo se ha cargado correctamente`, 'success');
            this.selectedFile2 = undefined;
            this.fileName2 = '';
            this.progress2.percentage2 = 0;
          }
        });
        
      }
  


}
