import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform{
    
    transform(texto: string, truncarEm: number): String {
        if(texto.length > truncarEm){
            return texto.substr(0, truncarEm).concat('...');
        }
        
        return texto;
    }
}