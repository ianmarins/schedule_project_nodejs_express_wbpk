const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')   
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require( './src/middlewares/middleware');


// Rotas da home // ISSO AQUI VEM DO ROUTES.JS
route.get('/', homeController.index);

//ISSO AQUI VEM DO FRONT E AI MANDA PARA O LUGAR CERTO
//rotas de login          //chama a funão index do loginControler //esse cara redenriza a o login.ejs, ele ja sabe e procura por login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas de contato  -> veja que para ir para o contato index, antes ele verfica o LoginRequired
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);



module.exports = route;
