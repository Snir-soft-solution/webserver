const { ISservices } = require('./services/ISSERVICES');

module.exports.ISservices = ISservices;
// const isService = new ISservices(null, 'web')

// console.log(isService.task.get({ table: 'allLinhaProduto', properties: 'designacao' }).then(e => {
//     console.log(e)
// }))