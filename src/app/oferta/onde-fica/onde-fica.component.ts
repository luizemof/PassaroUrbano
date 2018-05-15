import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasSevice } from '../../ofertas.services';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasSevice]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';
  constructor(private route: ActivatedRoute, private ofertasService: OfertasSevice) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      
      this.ofertasService.getOndeFica(parametros.id)
        .then((descricao: string) => {
          this.ondeFica = descricao;
        });

    })

  }
}
