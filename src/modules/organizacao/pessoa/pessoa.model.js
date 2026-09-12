
export default class Pessoa{
    #id;
    #nome;
    #cpf;
    #rg;
    #email;
    #telefone;
    #dataNascimento;
    #dataCadastro;

    constructor(id, nome, cpf, rg, email, telefone, dataNascimento, dataCadastro){
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#rg = rg;
        this.#email = email;
        this.#telefone = telefone;
        this.#dataNascimento = dataNascimento;
        this.#dataCadastro = dataCadastro;
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

    get cpf(){
        return this.#cpf;
    }

    set cpf(cpf){
        this.#cpf = cpf;
    }

    get rg(){
        return this.#rg;
    }

    set rg(rg){
        this.#rg = rg;
    }

    get email(){
        return this.#email;
    }

    set email(email){
        this.#email = email;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(telefone){
        this.#telefone = telefone;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(dataNascimento){
        this.#dataNascimento = dataNascimento;
    }

    get dataCadastro(){
        return this.#dataCadastro;
    }

    set dataCadastro(dataCadastro){
        this.#dataCadastro = dataCadastro;
    }

    toJSON(){
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            rg: this.#rg,
            email: this.#email,
            telefone: this.#telefone,
            dataNascimento: this.#dataNascimento,
            dataCadastro: this.#dataCadastro
        }
    }
}