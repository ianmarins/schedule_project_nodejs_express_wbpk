const mongoose = require('mongoose');
const validator = require('validator');

//o esquema do contto veja que campos nao sao obrigatorios e por padrão podem ir vazios
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm:  { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

//poderia ser uma classe mas criamos com funcao construtora para aprendizado
function Contato(body) {
  this.body =  body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);

}

Contato.prototype.valida = function() {
  this.cleanUp();
  //esse validator e um pacote utilizando para saber se uma e-mail e memso um email -NPM i validator
  //se nao for um email valido adiciona no array de erros
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email Invalido');
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
  if(!this.body.email && !this.body.telefone){
    this.errors.push('Pelo menos um contao precisa ser enviado: email ou telefone' );
  } 

};

//limpa nosso item
Contato.prototype.cleanUp = function(){
  //trata os dados inseridos, se nao for string retorna uma string vazia
  for(const key in this.body){
    if(typeof  this.body[key]  !== 'string'){
     this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
}

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
};

//metodos estaticos
//e uma função estatica, nao faz parte da função construtorua Contato
Contato.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
}

Contato.buscaContatos = async function() {  
  const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1});
  return contatos;
}


Contato.delete = async function(id) { 
  if(typeof id !== 'string') return; 
  //esse findeOnde tenho que madar um objeto com ID FILTRO MESMO DO MONGO
  const contato = await ContatoModel.findOneAndDelete({_id: id});
  return contato;
}

module.exports = Contato;
