const axios = require('axios');
class GraphQL {
    constructor() {
        this.schema = '';
        this.__tb = '';
    }

    generic({ query, variables, uri }) {

        if (query === '') return console.error('you must pass some string on the query property');
        if (query !== undefined) {
            this.schema = { query, variables }
        } else {
            this.schema = { query }
        }
        return fetch(uri, {
            method: "post",
            body: JSON.stringify(this.schema),
            headers: { "Content-Type": "application/json" }
        });

    }

    get({ query, table, properties }) {
        this.__tb = table;
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
            this.schema = {
                query: `query($id: String!, $consts: String ${props}) { ${table} (id: $id, consts: $consts ${val}) {${properties}} }`,
                variables: {
                    ...query
                }
            }
        } else {
            this.schema = {
                query: `query { ${table} {${properties}} }`
            }
        }
        return this;
    }

    add({ table, properties, values }) {
        this.schema = {
            query: `mutation($obj: ${table[0].toLowerCase() + table.substr(1, table.length)}Input!) { add${table}(obj: $obj) {${properties}} }`,
            variables: {
                obj: values
            }
        }
        this.__tb = `add${table}`;

        return this;
    }

    update({ query, table, properties, values }) {
        this.schema = {
            query: `mutation($id: String!, $obj: ${table.toLowerCase()}Input!) { update${table}(id: $id, obj: $obj) {${properties}} }`,
            variables: {
                id: query.id,
                obj: values
            }
        }
        this.__tb = `update${table}`;
        return this;
    }

    remove({ query, table, properties }) {
        this.schema = {
            query: `mutation($id: String!) { remove${table}(id: $id) {${properties}} }`,
            variables: {
                id: query.id
            }
        }
        this.__tb = `remove${table}`;
        return this;
    }

    auth() {}

    async run(uri) {
        return await axios.post(uri, this.schema)
            .then(res => res.data.data)
            .catch(err => err)
    }

}

exports.GraphQL = new GraphQL;