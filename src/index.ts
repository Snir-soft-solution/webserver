import {Service}  from './services/service';
import {isEmpty} from './helpers/helpers'
import {COTACAOTEMPLATE} from './helpers/platforms'
// const service = new Service('WEBISTE')

// service.task.get({ table: 'allLinhaProduto', properties: 'designacao' }).then((e:any)=>{
//     console.log(e)
// }).catch((err:any)=>console.log(err))

// service
// .InsertCotacao(COTACAOTEMPLATE,'viagem','tomadorId produtorId')
// .then((e:any)=>{
//     console.log(e)
// })
export const IService = Service
