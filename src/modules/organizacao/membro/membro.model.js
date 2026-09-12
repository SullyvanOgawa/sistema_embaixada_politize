export default class Membro{
    #id;
    #pessoa;
    #cargo;
    #diretoria;
    #dataInicio;
    #dataFim;
    #status;

    constructor(id, pessoa, cargo, diretoria, dataInicio, dataFim, status){
        this.#id = id;
        this.#pessoa = pessoa;
        this.#cargo = cargo;
        this.#diretoria = diretoria;
        this.#dataInicio = dataInicio;
        this.#dataFim = dataFim;
        this.#status = status;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get pessoa(){
        return this.#pessoa;
    }

    set pessoa(pessoa){
        this.#pessoa = pessoa;
    }

    get cargo(){
        return this.#cargo;
    }

    set cargo(cargo){
        this.#cargo = cargo;
    }

    get diretoria(){
        return this.#diretoria;
    }

    set diretoria(diretoria){
        this.#diretoria = diretoria;
    }

    get dataInicio(){
        return this.#dataInicio;
    }

    set dataInicio(dataInicio){
        this.#dataInicio = dataInicio;
    }

    get dataFim(){
        return this.#dataFim;
    }

    set dataFim(dataFim){
        this.#dataFim = dataFim;
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
            pessoa: this.#pessoa,
            cargo: this.#cargo,
            diretoria: this.#diretoria,
            dataInicio: this.#dataInicio,
            dataFim: this.#dataFim,
            status: this.#status
        }
    }
}