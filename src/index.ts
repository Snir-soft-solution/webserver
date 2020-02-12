import {Service}  from './services/service';
import {isEmpty} from './helpers/helpers'
import {COTACAOTEMPLATE} from './helpers/platforms'
const service = new Service('WEBISTE')

// const viagem = async () =>{
//     try {
//         let data = await service.task.get({ table: 'allLinhaProduto', properties: 'designacao' });
//         console.log(data)
//     } catch (error) {
//         console.log(error.toJSON())
//     }
   
// }

// viagem()

//COTACAOTEMPLATE,'viagem','tomadorId produtorId idCotacao'
// service
// .storeCotacao({data:COTACAOTEMPLATE,type:'viagem',output:'tomadorId produtorId idCotacao'})
// .then((e:any)=>{
//     console.log(e)
// })

// service.storePessoa({input:"",output:""},)

// service
// .auth
// .signUp(
//     {
//     username: "adilsonLopes",
//     email: "adilsonLopes@hotmail.com",
//     password: "Snir.@#123a",
//     confirmarPassword: "Snir.@#123"
//    },
//    "token username"
// ).then((e:any)=>{
//     console.log(e)
// })

// service
// .auth
// .signIn(
//     {
//     nomeUsuarioOuEmail: "adilsonLopes",
//     senha: "Snir.@#123"
//    },
//    "token nomeUsuarioOuEmail"
// ).then((e:any)=>{
//     console.log(e)
// })
export const IService = Service
