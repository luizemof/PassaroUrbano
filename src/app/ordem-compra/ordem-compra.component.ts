import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraServices } from '../ordem-compra.services'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoServices } from '../carrinho.services';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraServices ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[];

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ]),
  });

  constructor(
    private ordemCompraService: OrdemCompraServices,
    private carrinhoServices: CarrinhoServices
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoServices.exibirItens();
    console.log('OrdemCompraComponente ', this.itensCarrinho);
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    } else {

      if(this.carrinhoServices.exibirItens().length === 0){
        alert('Você não selecionou nenhum item.');
      } else {

        this.ordemCompraService.efetivarCompra(new Pedido(
          this.formulario.value.endereco, 
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoServices.exibirItens()
        ))
        .subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido;
          this.carrinhoServices.limparCarrinho();
        });
      }
    }
  }
}
