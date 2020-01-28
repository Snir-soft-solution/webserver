"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./services/service");
// const service = new Service('WEBISTE')
// service.task.get({ table: 'allLinhaProduto', properties: 'designacao' }).then((e:any)=>{
//     console.log(e)
// }).catch((err:any)=>console.log(err))
// service
// .InsertCotacao(COTACAOTEMPLATE,'viagem','tomadorId produtorId')
// .then((e:any)=>{
//     console.log(e)
// })
exports.IService = service_1.Service;