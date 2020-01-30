# SNIR Web Server Access

Get perfect Ensurance functions to Snir Devs

# Installation
`npm i webserveraccess --save`

Then...

...

import {IService} from 'webserveraccess';

## Use Task

    service.task.get({ table: 'tabeName', properties: 'designacao' }).then(response=>{
    console.log(response)
    }).catch((err:any)=>console.log(err))

## Use Authentication
 `SignUp`

    service
    .auth
    .signUp(
        {
        username: "adilsonLopes",
        email: "adilsonLopes@hotmail.com",
        password: "Snir.@#123a",
        confirmarPassword: "Snir.@#123"
    },
    "token username"
    ).then(response=>{
        console.log(response)
    })


 `SignIn`
 
    service
    .auth
    .signIn(
        {
        nomeUsuarioOuEmail: "adilsonLopes",
        senha: "Snir.@#123"
    },
    "token nomeUsuarioOuEmail"
    ).then((e:any)=>{
        console.log(e)
    })
...

## Options