import { Component, OnInit } from '@angular/core';
//import {ModalDirective} from 'angular-bootstrap-md';
import {NgbModalConfig, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Dipendente } from './dipendente';
import { DipendenteServiceService } from './dipendente-service.service';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class AppComponent implements OnInit {
  /* 
  elementi = ['primo elemento'];
  daFiglioAPadre(name:string){
    this.elementi.push(name);
  }
   */

  //ricerca dei dipendenti
  // il ! gestisce il dipendente vuoto
  public dipendenti!: Dipendente[];
  public editDipendente!: Dipendente;
  public deleteDipendente!: Dipendente;

  constructor(
    private dipendenteService: DipendenteServiceService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //permette di gestire il momento della creazione
  ngOnInit() {
    this.getDipendenti();
  }

//gestione apertura modale
  openAddModal(addModal:any){
  this.modalService.open(addModal);
}

openUpdateModal(updateModal:any,dipendente:Dipendente){
  this.editDipendente=dipendente;
  this.modalService.open(updateModal);
}
openDeleteModal(deleteModal:any,dipendente:Dipendente){
  this.deleteDipendente=dipendente;
  this.modalService.open(deleteModal);
}

//chiusura modali
closeAddModal(){
  (document.getElementById('add-dipendente-form')as HTMLElement).click();
}

closeUpdateModal(){
  (document.getElementById('update-dipendente-form')as HTMLElement).click();
}

closeDeleteModal(){
  (document.getElementById('delete-dipendente-form')as HTMLElement).click();
}


//chiamate api

  public getDipendenti(): void {
    this.dipendenteService.getDipendenti().subscribe({
      next: (dipendente) => {
        this.dipendenti = dipendente;
        console.log(this.dipendenti);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  public addDipendente(addForm: NgForm): void {
    console.log("dentro funzione addDipendente")
    this.closeAddModal();
    //chiamata
    this.dipendenteService.addDipendente(addForm.value).subscribe({
      next: () => {
        this.dipendenteService.addDipendente(addForm.value);
        addForm.reset();
        this.getDipendenti();
        alert('dipendente aggiunto correttamente');
      },
      error: (error) => {
        alert("attenzione, errore nell'aggiunta di un dipendente");
        console.log('errore', error);
        addForm.reset();
      },
    })
  }

  public updateDipendente(dipendente: Dipendente): void {
    this.dipendenteService.updateDipendente(dipendente).subscribe({
      next: () => {
        this.closeUpdateModal();
        this.getDipendenti();
      },
      error: (error) => {
        alert: error.message;
      }
    })
  }

  public removeDipendente(dipendenteId:number): void{
    this.dipendenteService.deleteDipendente(dipendenteId).subscribe({
      next:(res)=>{
        console.log(res);
        this.closeDeleteModal();
        this.getDipendenti();
      },
      error:(error)=>{
        alert(error.message);
      }
    })
  }
  public searchDipendenti(key: string): void{
    const results: Dipendente[] = [];
    for( const dipendente of this.dipendenti){
      if(dipendente.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(dipendente);
      }
    }
    this.dipendenti = results;
    if(results.length === 0 || !key){
      this.getDipendenti();
    }
  }
}

