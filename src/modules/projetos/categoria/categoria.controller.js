import CategoriaService from './categoria.service.js';

export default class CategoriaController{
   constructor(){
      this.categoriaService = new CategoriaService();
   }

    async gravar(request, response){
        try{
            const categoria = await this.categoriaService.gravar(request.body);

            if(categoria){
                response.status(201).json({
                    status: true,
                    mensagem: 'Categoria cadastrada com sucesso.',
                    categoria: categoria
                });
            }
        }
        catch(error){
            response.status(500).json({
                status: false,
                mensagem: 'Não foi possível cadastrar a categoria.' + error.message
            });
        }
    }

    async editar(request, response){
        try{

            const id = request.params.id;
            const categoria = await this.categoriaService.editar(id, request.body);

            response.status(200).json({
                status:true,
                mensagem: 'Categoria editada com sucesso.',
                categoria: categoria
            });

        }
        catch(error){
            response.status(500).json({
                status: false,
                mensagem: 'Erro ao editar a categoria.' + error.message
            });
        }
    }

    async excluir(request, response){
        try{

            const id = request.params.id;
            await this.categoriaService.excluir(id);

            response.status(200).json({
                status: true,
                mensagem: 'Categoria excluída com sucesso.'
            });

        }
        catch(error){
            response.status(500).json({
                status: false,
                mensagem: 'Erro ao excluir categoria.' + error.message
            });
        }
    }

    async consultar(request, response){
        try{
            const termoBusca = request.params.id ?? '';
            
            const categoria = await this.categoriaService.consultar(termoBusca);

            response.status(200).json({
                status: true,
                mensagem: 'Consulta realizada com sucesso.',
                categoria: categoria
            });

        }
        catch(error){
            response.status(500).json({
                status: false,
                mensagem: 'Erro ao consultar categorias.' + error.message
            });
        }
    }
    

   
}