/**
 * Interface for all Service
 */
export interface IService{
    getStatus: ()=> object
}


/**
 * Interface for all Inserts Objects
 * @param input Dados para serem inseridas na BD
 * @param outuput Campos na qual espera-se como saído depois da inserção de dados
 */
export interface IInsertModel {
    input:any;
    output?:string;
    type?:string;
}

/**
 * Interface para o cadastro de Cotação
 * @param data Dados para serem inseridas na BD
 * @param type Tipo de Plano ex: VIAGEM, AUTOMOVEL
 * @param output Campos na qual espera-se como saído depois da inserção de dados
 */
export interface ICotacao{
    data:any;
    type:string;
    table?:string;
    output?:string;
}


export interface IPessoa{
    onSave: ()=> any;
    onDelete: ()=> any;
    onUpdate: ()=> any;
    onSelect: ()=> any;
    
}

export interface IPessoaSingular{
    pessoa:any
}

export interface IPessoaColetivo{

}

export interface IAuthProperties{
    idUsuario?:string
    username?:string
    email?:string
    token:string
    [key:string]:any
}

export interface IAuthObjectForSignUp{
    username: string,
    email: string,
    password: string,
    confirmarPassword:string
}

export interface IAuthObjectForSignIn{
    nomeUsuarioOuEmail: string,
    senha: string,
    lembrarDeMim?: string,
}

export interface IAuth{
    signIn(data:IAuthObjectForSignIn,props:string):any
    signUp(data:IAuthObjectForSignUp,props:string):any
}