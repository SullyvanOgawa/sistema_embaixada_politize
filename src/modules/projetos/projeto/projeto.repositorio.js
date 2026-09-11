import Projeto from './projeto.model.js';
import Categoria from '../categoria/categoria.model.js';
import pool from '../../../../database/db.js';

export default class ProjetoRepositorio{
    async gravar(projeto){
        const sql = `INSERT INTO projeto(   proj_nome, 
                                            proj_descricao, 
                                            proj_data_inicio, 
                                            proj_prazo, 
                                            proj_ativo, 
                                            cat_id) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
        
        const parameros = [
            projeto.nome,
            projeto.descricao,
            projeto.dataInicio,
            projeto.prazo,
            projeto.ativo,
            projeto.categoria.id
        ];

        const conexao = await pool.getConnection();
        const resultado = await conexao.execute(sql, parameros);
        projeto.id = resultado[0].insertId;
        
        conexao.release(); 
    }

    async editar(projeto){
        const sql = `UPDATE projeto SET proj_nome = ?,
                                        proj_descricao = ?,
                                        proj_data_inicio = ?,
                                        proj_prazo = ?,
                                        proj_ativo = ?,
                                        cat_id = ?
                    WHERE proj_id = ?`;
        
        const parametros = [
            projeto.nome,
            projeto.descricao,
            projeto.dataInicio,
            projeto.prazo,
            projeto.ativo,
            projeto.categoria.id,
            projeto.id
        ];

        const conexao = await pool.getConnection();
        await conexao.execute(sql, parametros);
        conexao.release();
    }

    async excluir(id){
        const sql = 'DELETE FROM projeto WHERE proj_id = ?';

        const conexao = await pool.getConnection();
        await conexao.execute(sql, [id]);
        conexao.release();
    }

    async consultar(termoBusca){
        let sql = '';
        let parametros = [];

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `SELECT   proj_id, 
                            proj_nome, 
                            proj_descricao, 
                            proj_data_inicio, 
                            proj_prazo, 
                            proj_ativo, 
                            cat_id 
                    FROM projeto WHERE proj_id = ?`;
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT   proj_id, 
                            proj_nome, 
                            proj_descricao, 
                            proj_data_inicio, 
                            proj_prazo, 
                            proj_ativo,  
                            cat_id 
                    FROM projeto WHERE proj_nome LIKE ?`;
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await pool.getConnection();
        const resultados = await conexao.execute(sql, parametros);
        conexao.release();

        let listProjetos = [];

        for(const resultado of resultados[0]){

            const categoria = new Categoria(resultado.cat_id, 
                                            resultado.cat_nome);
            const projeto = new Projeto(
                resultado.proj_id,
                resultado.proj_nome,
                resultado.proj_descricao,
                resultado.proj_data_inicio,
                resultado.proj_prazo,
                resultado.proj_ativo,
                categoria
            );

            listProjetos.push(projeto);
        }

        return listProjetos;
    }
}