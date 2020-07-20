const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')   
//const contatoController = require('./src/controllers/contatoController');


// Rotas da home // ISSO AQUI VEM DO ROUTES.JS
route.get('/', homeController.index);

//ISSO AQUI VEM DO FRONT E AI MANDA PARA O LUGAR CERTO
//rotas de login          //chama a funão index do loginControler //esse cara redenriza a o login.ejs, ele ja sabe e procura por login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

module.exports = route;
