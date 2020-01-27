const { DEFAULT_URI } = require('../config')
const { GraphQL } = require('../functions/consume')
const axios = require('axios')
class ISservices {
    constructor(uri, platform) {
        this.uri = uri || DEFAULT_URI;
        this.platform = platform;
    }

    getStatus() {
        return {
            uri: this.uri,
            platform: this.platform
        }
    }


    get task() {
        return {
            get: obj => {
                if (typeof obj !== 'object') throw new Error('O valor do parametro deve ser um objecto.');
                return GraphQL.get(obj).run(this.uri);
            },
            insert: obj => {
                if (!obj.hasOwnProperty('varible')) throw new Error('Deve passar a propriedade "Varible".');
                if (!obj.hasOwnProperty('query')) throw new Error('Deve passar a propriedade "Query".');
                return GraphQL.add(obj).run(this.uri);
            }
        }
    }

}

exports.ISservices = ISservices;