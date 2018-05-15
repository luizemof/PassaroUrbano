import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasSevice } from '../ofertas.services';
import { CarrinhoServices } from '../carrinho.services';

import { Oferta } from '../shared/oferta.model';
import { CURRENCY } from '../shared/geral.model'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasSevice ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  public currency: String = CURRENCY;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasSevice,
    private carrinhoServices: CarrinhoServices
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOferta(parametros.id)
        .then((oferta: Oferta) => this.oferta = oferta);
    })
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoServices.incluirItem(this.oferta);
    console.log(this.carrinhoServices.exibirItens());
  }
}
