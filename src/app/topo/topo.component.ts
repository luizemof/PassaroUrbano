import { Component, OnInit } from '@angular/core';
import { OfertasSevice } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasSevice ]
})
export class TopoComponent implements OnInit {

  public ofertas: Oferta[];

  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasSevice: OfertasSevice) { }

  ngOnInit() {
    this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
          if(termo.trim() === ''){
            return Observable.of<Oferta[]>([]);
        }

        return this.ofertasSevice.pesquisaOferta(termo);
      })
      .catch((err: any) =>{
        console.log(err);
        return Observable.of<Oferta[]>([]);
      })
      .subscribe(
        (ofertas: Oferta[]) => this.ofertas = ofertas
      );
  }

  public pesquisa(termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa():void{
    this.subjectPesquisa.next('');
  }
}
