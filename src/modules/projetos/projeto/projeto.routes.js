import {Router} from 'express';
import ProjetoController from './projeto.controller.js';

const routerProjeto = Router();
const projetoCtrl = new ProjetoController();

routerProjeto.post('/projeto', (request, response) => {
    projetoCtrl.gravar(request, response);
});

routerProjeto.get('/projeto/:id', (request, response) => {
    projetoCtrl.consultar(request, response);
});

routerProjeto.get('/projeto', (request, response) => {
    projetoCtrl.consultar(request, response);
});

routerProjeto.put('/projeto/:id', (request, response) => {
    projetoCtrl.editar(request, response);
});

routerProjeto.patch('/projeto/:id', (request, response) => {
    projetoCtrl.editar(request, response);
});

routerProjeto.delete('/projeto/:id', (request, response) => {
    projetoCtrl.excluir(request, response);
});

export default routerProjeto;