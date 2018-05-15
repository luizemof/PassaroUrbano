import { Component, OnInit } from '@angular/core';
import { OfertasSevice } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasSevice ]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
  
  constructor(private ofertasServices: OfertasSevice) { }

  ngOnInit() {
    this.ofertasServices.getOfertas()
      .then((ofertas: Oferta[]) => this.ofertas = ofertas)
      .catch((param: any) => { console.log(param) });
  }
}