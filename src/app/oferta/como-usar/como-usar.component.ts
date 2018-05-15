import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasSevice } from '../../ofertas.services';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasSevice ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasSevice) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getComoUsarOferta(parametros.id)
        .then((descricao: string) => {
          this.comoUsar = descricao;
        });
    })
  }
}
