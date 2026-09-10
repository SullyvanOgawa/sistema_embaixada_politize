import Categoria from './categoria.model.js';
import pool from '../../../../database/db.js';

export default class CategoriaReposit{
    async gravar(categoria){
        const sql = 'INSERT INTO categoria(cat_nome) VALUES (?)';

        const parametros = [categoria.nome];

        const conexao = await pool.getConnection();
        const resultado = await conexao.execute(sql, parametros);
        categoria.id = resultado[0].insertId;

        conexao.release();
    }

    async editar(categoria){
        const sql = 'UPDATE categoria SET cat_nome = ? WHERE cat_id = ?';

        const parametros = [categoria.nome, categoria.id];

        const conexao = await pool.getConnection();
        await conexao.execute(sql, parametros);
        conexao.release();
    }

    async excluir(id){
        const sql = 'DELETE FROM categoria WHERE cat_id = ?';

        const conexao = await pool.getConnection();
        await conexao.execute(sql, [id]);
        conexao.release();
    }

    async consultar(termoBusca){
        let sql = '';
        let parametros = [];

        if (!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            
            sql = `SELECT cat_id, cat_nome FROM categoria WHERE cat_id = ?`;
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT cat_id, cat_nome FROM categoria WHERE cat_nome LIKE ?`;
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await pool.getConnection();
        const resultados = await conexao.execute(sql, parametros);
        conexao.release();

        let listCategorias = [];

        for(const resultado of resultados[0]){
            const categoria = new Categoria(resultado.cat_id, resultado.cat_nome);
            
            listCategorias.push(categoria);
        }

        return listCategorias;
    }


}

