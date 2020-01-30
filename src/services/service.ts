import GraphQL from './consumeGraphql';
import {DEFAULT_URI} from '../helpers/config'
import {IService,IInsertModel, ICotacao, IAuthObjectForSignIn,IAuthObjectForSignUp, IAuthProperties, IAuth} from '../interfaces'
import Pessoa from '../modules/Pessoa/pessoa';
import Cotation,{CotationModel} from '../modules/Cotacao/cotation';
import { PESSOAS } from './types';

export class Service implements IService {
    constructor(private platform:string,private uri?:string,){
        this.uri = uri || DEFAULT_URI;
        this.platform = platform.toUpperCase();
    }

    getStatus(): object{
        
        return {
            uri:this.uri,
            platform: this.platform
        }
    }

    get task(): any {
        return {
            get: (obj:object,callback?:Function):any =>{
                if (typeof obj !== 'object') throw new Error('O valor do parametro deve ser um objecto.')
                return  GraphQL.get(obj).run(this.uri,callback)
            },
            insert: (obj:object):any => {
                if (!obj.hasOwnProperty('table')) throw new Error('Deve passar a propriedade "table".')
                if (!obj.hasOwnProperty('values')) throw new Error('Deve passar a propriedade "value".')
                return GraphQL.add(obj).run(this.uri)
            }
        }
    }


    storePessoa(model:IInsertModel){
        const {type} = model;
        const _instance = new Pessoa({pessoa:""});
        if(type?.toUpperCase() === PESSOAS.SINGULAR){
            _instance.onSave()
        }
        else if(type?.toUpperCase() === PESSOAS.COLETIVO){

        }

       
       
    }

    /**
     *  Cotações
     *  Aqui terá todas as funções que vai lida com os Cotações
     */

    storeCotacao(config:ICotacao):any{
        let {output,data,type,table} = config;
        table = table || 'Cotacao';
        output = output || 'idCotacao';
        const _instance = new Cotation(data);
        
        if(_instance.onInsert(type.toUpperCase()) !== true) return new Error("AS")

        return this.task.insert({table,values:data,properties:output})
    }



    /**
     * Autenticação
     *  Aqui terá todas as funções que vai lida com os questionario
     */
    get auth():IAuth{
        return {
            signIn:(obj:IAuthObjectForSignIn,properties:string)=>{
                return GraphQL.signIn(obj,properties).run(this.uri)
            },
            signUp:(obj:IAuthObjectForSignUp,properties:string)=>{
                return GraphQL.storeUser(obj,properties).run(this.uri)
            }
        }
    }

    /**
     *  Questionarios
     *  Aqui terá todas as funções que vai lida com os questionario
     */

}


