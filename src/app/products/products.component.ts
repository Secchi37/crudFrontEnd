import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

  constructor() { }
  stringaBooleano: Boolean = true;

 
  @Output() passaggioFiglioPadre = new EventEmitter();
  dalFiglioaPadre(elementoDaPassare: string) {
    this.passaggioFiglioPadre.emit(elementoDaPassare);
  }

}
