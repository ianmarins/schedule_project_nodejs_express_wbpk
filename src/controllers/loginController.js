const Login = require('../models/loginModel');

exports.index = (req, res) =>{
    if(req.session.user) return res.render('login-logado');
    return res.render('login'); //esse cara redenriza a o login.ejs, ele ja sabe e procura por login
};

//EXPORTA PARA O ROTAS, O INDEXLOGIN, CHAMA O ROTAS QUE CHAMA O REGISTER
exports.register = async  function(req, res){
    try{
        //MANDA O BODY INTRIRO ou seja o corpo todo
        const login = new Login(req.body); //E DE ONDE VEM O POST DE FORMULARIO VEM DO FRONT
        //chama o metodo registar REGISTER do LoginModel
        await login.register();
        //Sempre quando eu postar alguma coisa para essa pagina o Req.body vai ser preenchd com os dados meu fomrulario
        if(login.errors.length > 0){
            //esse flash envia para o frint erros
            req.flash('errors', login.errors);
            req.session.save(function() {
            return res.redirect('back'); //redieciona para pagina anterior
            });
            return; 
        }  
        req.flash('success', 'Seu Usuário foi cadastrado com sucesso!');
        req.session.save(function() {
            return res.redirect('back'); //redieciona para pagina anterior
        });

    } catch(e){
        console.log(e);
        return res.render('404');
    };
    // await login.register();
    // res.send(login.errors);
};


exports.login = async function(req, res){
    try{
        const login = new Login(req.body); //E DE ONDE VEM O POST DE FORMULARIO VEM DO FRONT
        await login.login();
       
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function() {
            return res.redirect('back'); //redieciona para pagina anterior
            });
            return; 
        }  

        req.flash('success', 'Autenticado voce entrou no sistema');
        req.session.user = login.user; //jogando o login para dentro da seção
        req.session.save(function() {
            return res.redirect('back'); //redieciona para pagina anterior
        });

    } catch(e){
        console.log(e);
        return res.render('404');
    };
   
};

//detroi a seção ao aprtar o botao sair
exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/'); //Redireciona para home
}