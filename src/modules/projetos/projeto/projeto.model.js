
export default class Projeto{
    #id; 
    #nome; 
    #descricao; 
    #dataInicio;
    #prazo; 
    #categoria;

    constructor(id, nome, descricao, dataInicio, prazo, categoria){
        this.#id = id; 
        this.#nome = nome; 
        this.#descricao = descricao; 
        this.#dataInicio = dataInicio;
        this.#prazo = prazo; 
        this.#categoria = categoria;
    }
    
    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }

    set nome(nome){
        this.#nome = nome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(descricao){
        this.#descricao = descricao;
    }

    get dataInicio(){
        return this.#dataInicio;
    }

    set dataInicio(dataInicio){
        this.#dataInicio = dataInicio;
    }

    get prazo(){
        return this.#prazo;
    }

    set prazo(prazo){
        this.#prazo = prazo;
    }

    get categoria(){
        return this.#categoria;
    }

    set categoria(categoria){
        this.#categoria = categoria;
    }

    toJSON(){
        return {
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            dataInicio: this.#dataInicio,
            prazo: this.#prazo,
            categoria: this.#categoria
        }
    }

}