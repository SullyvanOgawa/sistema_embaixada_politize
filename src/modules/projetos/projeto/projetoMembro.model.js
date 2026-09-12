
export default class ProjetoMembro{
    #id;
    #projeto;
    #membro;

    constructor(id, projeto, memebro){
        this.#id = id;
        this.#projeto = projeto;
        this.#membro = memebro;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get projeto(){
        return this.#projeto;
    }

    set projeto(projeto){
        this.#projeto = projeto;
    }

    get membro(){
        return this.#membro;
    }

    set membro(membro){
        this.#membro = membro;
    }

    toJSON(){
        return {
            id: this.#id,
            projeto: this.#projeto,
            membro: this.#membro
        }
    }
}