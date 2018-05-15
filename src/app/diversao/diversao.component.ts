import { Component, OnInit } from '@angular/core';
import { OfertasSevice } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { CURRENCY } from '../shared/geral.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasSevice]
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[];
  public currency: String = CURRENCY;
  
  constructor(private ofertasService: OfertasSevice) { }

  ngOnInit() {
    this.ofertasService.getOfertasDiversao()
      .then((ofertas: Oferta[]) => this.ofertas = ofertas);
  }
}
