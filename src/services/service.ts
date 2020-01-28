import {DEFAULT_URI} from '../helpers/config'
import GraphQL from './consumeGraphql';
import Cotation,{CotationModel} from './cotation';

interface IService{
    uri:string,
    platform:string,
    getStatus: ()=> object
}

export class Service implements IService{
    uri!: string;
    platform: string;
    constructor(platform:string,uri?:string,){
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

    InsertCotacao(model:any,type:string,output?:string):any{
        output = output || 'idCotacao'
        const _instance = new Cotation(model);
        if(_instance.onInsert(type.toUpperCase()) !== true) return new Error("AS")

        return this.task.insert({table:'Cotacao',values:model,properties:output})
    }
}


