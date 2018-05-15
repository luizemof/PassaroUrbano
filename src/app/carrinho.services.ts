import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

export class CarrinhoServices {
    
    private itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[]{
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void{
        let itemCarrinho: ItemCarrinho = this.itens.find((item: ItemCarrinho) => item.id === oferta.id);

        if(itemCarrinho === undefined) {
            itemCarrinho = new ItemCarrinho(
                oferta.id,
                oferta.imagens[0],
                oferta.titulo,
                oferta.descricao_oferta,
                oferta.valor,
                1
            );
            
            this.itens.push(itemCarrinho);
        } else {
            itemCarrinho.quantidade ++;
        }        
    }

    public totalCarrinhoCompras(): number{
        let total: number = 0;
        this.itens.map((item:ItemCarrinho) => total += (item.valor * item.quantidade));
        return total;
    }

    public adicionarQuantidade(itemCarrinhoId: number): void {
        let itemCarrinhoEncontrado = this.itens.find((currentItem: ItemCarrinho) => currentItem.id === itemCarrinhoId);

        if(itemCarrinhoEncontrado !== undefined){
            itemCarrinhoEncontrado.quantidade++;
        }
    }

    public removerQuantidade(itemCarrinhoId: number): void {
        let itemCarrinhoEncontrado = this.itens.find((currentItem: ItemCarrinho) => currentItem.id === itemCarrinhoId);

        if(itemCarrinhoEncontrado !== undefined && itemCarrinhoEncontrado.quantidade > 0){
            itemCarrinhoEncontrado.quantidade--;

            if(itemCarrinhoEncontrado.quantidade < 1){
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public limparCarrinho():void{
        this.itens = [];
    }
}