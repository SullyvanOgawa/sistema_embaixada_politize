import ProjetoMembro from './projetoMembro.model.js';
import Projeto from '../projeto.model.js';
import Membro from '../../../organizacao/membro/membro.model.js';
import ProjetoMembroRepositorio from './projetoMembro.repositorio.js';
import pool from '../../../../../database/db.js';

export default class ProjetoMembroRepositorio{
    async gravar(projetoMembro){
        const sql = `insert into projeto_membro(
                                        proj_id, 
                                        memb_id) 
                                values(?, ?)`;

        const parametros = [
            projetoMembro.projeto.id,
            projetoMembro.membro.id
        ];

        const conexao = await pool.getConnection();
        const resultado = await conexao.execute(sql, parametros);
        projetoMembro.id = resultado[0].insertId;

        conexao.release();
    }

    async editar(projetoMembro){
        const sql = `update projeto_membro set 
                                        proj_id = ?, 
                                        memb_id = ? 
                                where proj_memb_id = ?`;

        const parametros = [
            projetoMembro.projeto.id,
            projetoMembro.membro.id,
            projetoMembro.id
        ];

        const conexao = await pool.getConnection();
        await conexao.execute(sql, parametros);
        conexao.release();
    }

    async excluir(id){
        const sql = `delete from projeto_membro where proj_membro_id = ?`;

        const conexao = await pool.getConnection();
        await conexao.execute(sql, [id]);
        conexao.release();
    }

    async consultarPorProjeto(termoBusca){
        let sql = '';
        let parametros = [];

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `select   pm.proj_memb_id, 
                            p.proj_nome,
                            m.mem_nome 
                    from projeto_membro pm
                    inner join projeto p on p.proj_id = pm.proj_id
                    inner join membro m on m.mem_id = pm.mem_id
                    where pm.proj_id = ?`;
            
                parametros = [termoBusca];
        }
             

        const conexao = await pool.getConnection();
        const resultados = await conexao.execute(sql, parametros);
        conexao.release();

        let listaProjetoMembros = [];

        for(const resultado of resultados){
            const projeto = new Projeto(
                                resultado.proj_id,
                                resultado.proj_nome,
                                resultado.proj_descricao,
                                resultado.proj_data_inicio,
                                resultado.proj_prazo   
            );

            const membro = new Membro(
                                resultado.memb_id,
                                resultado.pes_id,
                                resultado.cargo_id,
                                resultado.dir_id,
                                resultado.mem_data_ini,
                                resultado.mem_data_fim,
                                resultado.mem_status
            );

            const projetoMembro = new ProjetoMembro(
                                        resultado.proj_memb_id,
                                        projeto,
                                        membro
            );

            listaProjetoMembros.push(projetoMembro);
            
        }

        return listaProjetoMembros;
        
    }

    async consultarPorMembro(termoBusca){
        let sql = '';
        let parametros = [];

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `select   pm.proj_memb_id, 
                            p.proj_nome,
                            m.mem_nome 
                    from projeto_membro pm
                    inner join projeto p on p.proj_id = pm.proj_id
                    inner join membro m on m.mem_id = pm.mem_id
                    where pm.mem_id = ?`;
            
                parametros = [termoBusca];
        }

        const conexao = await pool.getConnection();
        const resultados = await conexao.execute(sql, parametros);
        conexao.release();

        let listaProjetoMembros = [];

        for(const resultado of resultados){
            const projeto = new Projeto(
                                resultado.proj_id,
                                resultado.proj_nome,
                                resultado.proj_descricao,
                                resultado.proj_data_inicio,
                                resultado.proj_prazo   
            );

            const membro = new Membro(
                                resultado.memb_id,
                                resultado.pes_id,
                                resultado.cargo_id,
                                resultado.dir_id,
                                resultado.mem_data_ini,
                                resultado.mem_data_fim,
                                resultado.mem_status
            );

            const projetoMembro = new ProjetoMembro(
                                        resultado.proj_memb_id,
                                        projeto,
                                        membro
            );

            listaProjetoMembros.push(projetoMembro);
            
        }

        return listaProjetoMembros;
    }
}