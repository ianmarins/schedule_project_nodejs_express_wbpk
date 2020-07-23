const Contato = require('../models/contatoModel');


exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
  return;
};




/* exports.trataPost = (req, res) => {
  res.send(req.body);
  return;
};
 */