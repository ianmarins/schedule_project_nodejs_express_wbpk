const Contato = require('../models/contatoModel');
const { ContextReplacementPlugin } = require('webpack');

exports.index = (req, res) => {
    //rederização da pagina front contato.ejs
    res.render('contato', {
        contato: {}
    })
};

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contato registrado com Sucesso!');
        //sendo sucesso no cadastro encaminha o id deste contato aqui para a proxima rota
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;

    } catch(e) {
        console.log(e);
        return res.render('404');        
    }
 
};


//A gente exporta o usuário que acabou de ser cadastrado para a proprio pagina, entao os campos continuam preenchidos
//la no front o value da label do form vai ficar sempre preenchido com o contato recem cadastrado
exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato){
        return res.render('404');
    }
    
    res.render('contato', {
        contato
    });   
};

//update do banco
exports.edit = async function(req, res){
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contato Editado com Sucesso!');
        //sendo sucesso no cadastro encaminha o id deste contato aqui para a proxima rota
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
    };

};

exports.delete = async function(req, res){
    if(!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if(!contato){
        return res.render('404');
    }
    
    req.flash('success', 'Contato apagado com Sucesso!');
    //sendo sucesso no cadastro encaminha o id deste contato aqui para a proxima rota
    req.session.save(() => res.redirect('back'));
    return;

};


