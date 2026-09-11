
import Projeto from './projeto.model.js';
import ProjetoRepositorio from './projeto.repositorio.js';
import Categoria from '../categoria/categoria.model.js';

export default class ProjetoService{
    constructor(){
        this.projetoRepositorio = new ProjetoRepositorio();
    }

    async gravar(projetos){

        const categoria = new Categoria(projetos.categoria.id,
                                        projetos.categoria.nome);
        const projeto = new Projeto(
            null,
            projetos.nome,
            projetos.descricao,
            projetos.dataInicio,
            projetos.prazo,
            projetos.ativo,
            categoria
        );

        const id = await this.projetoRepositorio.gravar(projeto);
        projeto.id = id;

        return projeto;
    }

    async editar(id, projetos){
        const categoria = new Categoria(projetos.categoria.id, projetos.categoria.nome);

        const projeto = new Projeto(
            id, 
            projetos.nome,
            projetos.descricao,
            projetos.dataInicio,
            projetos.prazo,
            projetos.ativo,
            categoria
        );

        await this.projetoRepositorio.editar(projeto);

        return projeto;
    }

    async excluir(id){
        await this.projetoRepositorio.excluir(id);
    }

    async consultar(termoBusca){
        const projetos = await this.projetoRepositorio.consultar(termoBusca);

        return projetos;
    }
        
        
}
