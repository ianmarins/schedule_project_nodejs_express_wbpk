//MIDLE PARA OS SUCESOS OU ERRO CADASRO SENHA
exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

//AQUI NO MEU MIDLE VAMOS TRATAR QUANDO OCORRER UM ERRO< OU NAO ACHAR A ROTA
exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

//midlleware para ver se o ususário esta logado na sessão cadastro
exports.loginRequired = (req, res, next ) => {
  if(!req.session.user){
    req.flash('errors', 'Voce precisa estar logado');
    req.session.save( () => res.redirect('/'));
    return;
  }
  next();//usuário esta logado pode pasasar para o proximo middle
};
