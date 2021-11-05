const express = require('express')
//var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.json()) 

app.post('/login', (req, res) => {
 
const  {nome , password} = req.body;


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function login(nome, pwd){

    const url = 'http://10.10.100.28:8180/mge/service.sbr?serviceName=MobileLoginSP.login&outputType=json';

    let strBody = '{ "serviceName": "MobileLoginSP.login", "requestBody": { "NOMUSU": { "$": "'+nome+'" }, "INTERNO":{ "$": "'+pwd+'" }, "KEEPCONNECTED": { "$": "S" } } }';

    let options = { 
        method: 'POST',
        qs: {serviceName: 'MobileLoginSP.login', outputType: 'json'},
        headers: {
            'Content-Type': 'application/json',
            cookie: 'JSESSIONID=og0DUV3g4yHY5lkZhfCIOPc_zZdtpg-Sbz_NFZqq.master; '
        },
        body : strBody,
    };
       
    fetch(url, options)
         .then(res => res.json())
         .then(json => res.json(json))
         .catch(err => console.error('error:' + err));


         
}

login(nome,password);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
