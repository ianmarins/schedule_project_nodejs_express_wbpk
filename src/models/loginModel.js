const mongoose = require('mongoose');
const validator = require('validator') //Validator de coisas automatico, utilizado para ver se um e-mail e mesmo um e-mail
const bcryptjs = require('bcryptjs');


//DEFINIFNO MEU MODELO
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }  
});

const LoginModel = mongoose.model('Login', LoginSchema);

// CLASEE LOGIN PRINCIPAL
class Login {
  constructor (body)  {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login () {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user){
      this.errors.push('Usário Não existe');
      return;
    } 

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha Invalida');
      this.user = null;
      return;
    };
  }

  //Metedo Async para tornar esse register uma promisse 
  async register(){
    //Validação dos dados inputados antes de registrar no banco
    this.valida();
    if(this.errors.length > 0) return;

    this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  
  }

  //verifica se ja existe um ususario no banco
  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if(user) this.errors.push('Usuário já existe');
  }

  valida(){
    this.cleanUp();
    //esse validator e um pacote utilizando para saber se uma e-mail e memso um email -NPM i validator
    //se nao for um email valido adiciona no array de erros
    if(!validator.isEmail(this.body.email)) this.errors.push('Email Invalido');
    
    if(this.body.password.length < 3 || this.body.password.length > 50){
      this.errors.push('A Senha precisa ter entre 3 e 50 Caracteres');
    }

  }

  //limpa nosso item
  cleanUp(){
    //trata os dados inseridos, se nao for string retorna uma string vazia
    for(const key in this.body){
     if(typeof  this.body[key]  !== 'string'){
       this.body[key] = '';
     }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }


};

//Exportando esse modulo para ser acessaso no Login Controller
module.exports = Login;
