import axios, { AxiosPromise } from 'axios';
import {isEmpty} from '../helpers/helpers'
class GraphQL {
    private schemma:object = {};
    private tb:string = '';
    constructor() {
    }

    generic(value:any) : any {
        const { query, variables, uri } = value;
        if (query === '') return console.error('you must pass some string on the query property');
        if (query !== undefined) {
            this.schemma = { query, variables }
        } else {
            this.schemma = { query }
        }
        return fetch(uri, {
            method: "post",
            body: JSON.stringify(this.schemma),
            headers: { "Content-Type": "application/json" }
        });

    }

    get({ query, table, properties }:any):any {
        this.tb = table;
        var val = '',
            props = '';
        const isSearchProps = ',$search:Boolean';
        const isSearchVal = ',search:$search';
        if (query !== undefined && query.hasOwnProperty('search')) {
            val = isSearchVal;
            props = isSearchProps;
        }
        if (query === '') return console.error('you must pass some string on the query property');
        if (query !== undefined) {
            this.schemma = {
                query: `query($id: String!, $consts: String ${props}) { ${table} (id: $id, consts: $consts ${val}) {${properties}} }`,
                variables: {
                    ...query
                }
            }
        } else {
            this.schemma = {
                query: `query { ${table} {${properties}} }`
            }
        }
        return this;
    }

    add({ table, properties, values }:any):any {
        this.schemma = {
            query: `mutation($obj: ${table[0].toLowerCase() + table.substr(1, table.length)}Input!) { add${table}(obj: $obj) {${properties}} }`,
            variables: {
                obj: values
            }
        }
        this.tb = `add${table}`;
        return this;
    }

    update({ query, table, properties, values }:any):any {
        this.schemma = {
            query: `mutation($id: String!, $obj: ${table.toLowerCase()}Input!) { update${table}(id: $id, obj: $obj) {${properties}} }`,
            variables: {
                id: query.id,
                obj: values
            }
        }
        this.tb = `update${table}`;
        return this;
    }

    remove({ query, table, properties }:any):any {
        this.schemma = {
            query: `mutation($id: String!) { remove${table}(id: $id) {${properties}} }`,
            variables: {
                id: query.id
            }
        }
        this.tb = `remove${table}`;
        return this;
    }

    auth() {}

    async run(uri:string,callback?:Function){
        return await axios.post(uri, this.schemma)
            .then(res => {
                const {errors} = res.data;
                if(!isEmpty(errors))  throw new Error(errors[0].message)
                if(callback !== undefined)
                    return callback(res.data.data)
                return res.data.data
            })
            .catch(err => err)
    }

}
export default new GraphQL();