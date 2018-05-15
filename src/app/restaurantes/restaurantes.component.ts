import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasSevice } from '../ofertas.services';
import { CURRENCY } from '../shared/geral.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasSevice ]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[];
  public currency:string = CURRENCY;

  constructor(private ofertasServices: OfertasSevice) { }

  ngOnInit() {
    this.ofertasServices.getOfertasRestaurante()
      .then((ofertas: Oferta[]) => this.ofertas = ofertas);
  }

}
