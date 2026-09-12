
export default class Diretoria{
    #id;
    #nome;
    #status;

    constructor(id, nome, status){
        this.#id = id;
        this.#nome = nome;
        this.#status = status;
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

    get status(){
        return this.#status;
    }

    set status(status){
        this.#status = status;
    }

    toJSON(){
        return {
            id: this.#id,
            nome: this.#nome,
            status: this.#status
        }
    }
}