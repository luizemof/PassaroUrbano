import { Oferta } from "./shared/oferta.model";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { DEFAULT_URL_API, OFERTA_URL_API, ONDE_FICA_URL_API } from "./app.api";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

@Injectable()
export class OfertasSevice
{
    constructor(private http: Http) { }

    public getOfertas():Promise<Array<Oferta>>
    {
        return this.http.get(`${DEFAULT_URL_API}?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    public getOferta(id: number): Promise<Oferta>
    {
        return this.http.get(`${DEFAULT_URL_API}?id=${ id }`)
            .toPromise()
            .then((resposta: Response) => 
            {
                return resposta.json().shift()
            });
    }

    public getOfertasRestaurante(): Promise<Oferta[]>
    {
        return this.getOfertasPorCategoria('restaurante');
    }

    public getOfertasDiversao(): Promise<Oferta[]>
    {
        return this.getOfertasPorCategoria('diversao');
    }

    private getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>>
    {
        return this.http.get(`${DEFAULT_URL_API}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }
    
    public getComoUsarOferta(id: number): Promise<string>
    {
        return this.http.get(`${OFERTA_URL_API}?id=${id}`)
            .toPromise()
            .then((resposta: Response) => 
            {
                return resposta.json()[0].descricao;
            });
    }

    public getOndeFica(id: number): Promise<string>
    {
        return this.http.get(`${ONDE_FICA_URL_API}?id=${id}`)
            .toPromise()
            .then((resposta: Response) =>
            {
                return resposta.json()[0].descricao;
            });
    }

    public pesquisaOferta(termo: string): Observable<Oferta[]>
    {
        return this.http.get(`${DEFAULT_URL_API}?descricao_oferta_like=${termo}`)
            .retry(10)
            .map((resposta: Response) => resposta.json());
    }
}