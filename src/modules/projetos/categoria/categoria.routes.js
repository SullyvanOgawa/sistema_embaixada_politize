import { Router } from 'express';
import CategoriaController from './categoria.controller.js';   

const routerCategoria = Router();
const categoriaCtrl = new CategoriaController();

routerCategoria.post('/categoria', (request, response) => {
    categoriaCtrl.gravar(request, response);
});

routerCategoria.get('/categoria/:id', (request, response) => {
    categoriaCtrl.consultar(request, response);
});

routerCategoria.get('/categoria', (request, response) => {
    categoriaCtrl.consultar(request, response);
});

routerCategoria.put('/categoria/:id', (request, response) => {
    categoriaCtrl.editar(request, response);
});

routerCategoria.patch('/categoria/:id', (request, response) => {
    categoriaCtrl.editar(request, response);
});

routerCategoria.delete('/categoria/:id', (request, response) => {
    categoriaCtrl.excluir(request, response);
});

export default routerCategoria;