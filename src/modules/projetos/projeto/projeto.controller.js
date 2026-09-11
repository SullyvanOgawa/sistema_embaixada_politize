import ProjetoService from './projeto.service.js';

export default class ProjetoController{
    constructor(){
        this.projetoService = new ProjetoService();
    }

    async gravar(request, response){
        try{
            const projeto = await this.projetoService.gravar(request.body);

            if(projeto){
                response.status(201).json({
                    status: true, 
                    mensagem: 'Projeto Gravado com Sucesso!', 
                    projeto: projeto
                });

            }
        } 
        catch (error) {
            response.status(500).json({
                status: false,
                mensagem: 'Erro ao gravar projeto!',
                erro: error.message
            });
        }
    }

    async editar(request, response){
        try{
            const id = request.params.id;
            const projeto = await this.projetoService.editar(id, request.body);

            response.status(200).json({
                status: true, 
                mensagem: 'Projeto editado com sucesso', 
                projeto: projeto
            });

        }
        catch(error){
            response.status(500).json({
                status: false, 
                mensagem: 'Erro ao editar projeto', 
                erro: error.message
            });

        }
    }

    async excluir(request, response){
        try{
            const id = request.params.id;
            await this.projetoService.excluir(id);

            response.status(200).json({
                status: true, 
                mensagem: 'Projeto excluído com sucesso'
            });
        }
        catch(error){
            response.status(500).json({
                status: false, 
                mensagem: 'Erro ao excluir projeto', 
                erro: error.message
            });
        }


    }

    async consultar(request, response){
        try{
            const id = request.params.id;
            const projeto = await this.projetoService.consultar(id);

            response.status(200).json({
                status: true, 
                mensagem: 'Lista de Projetos', 
                projeto: projeto
            });
        }
        catch(error){
            response.status(500).json({
                status: false, 
                mensagem: 'Erro ao consultar projeto', 
                erro: error.message
            });
        }
    }
}