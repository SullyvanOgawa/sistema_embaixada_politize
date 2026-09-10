import Categoria from './categoria.model.js';
import CategoriaReposit from './categoria.repositorio.js';

export default class CategoriaService{
    constructor(){
        this.categoriaReposit = new CategoriaReposit();
    }

    async gravar(categorias){
        const categoria = new Categoria(
                                null,
                                categorias.name
                            );

        const id = await this.categoriaReposit.gravar(categoria);
        categoria.id = id;
        
        return categoria;
    }

    async editar(id, categorias){
        const categoria = new Categoria(
            id, 
            categorias.name
        );

        await this.categoriaReposit.editar(categoria);

        return categoria;
    }

    async excluir(id){
        await this.categoriaReposit.excluir(id);
    }

    async consultar(termoBusca){
        const categorias = await this.categoriaReposit.consultar(termoBusca);

        return categorias;
    }

}