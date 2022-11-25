const Usuario = require('../models/Pessoa');



module.exports = (function () {
    var usuarioServices = {};

    usuarioServices.salvarNova = async function (nome, cpf, nascimento) {

        if (!nome) {
            throw new Error('Nome é requirido');
        }
        if (!cpf) {
            throw new Error('Cpf é requirido');
        }

        if (!nascimento) {
            throw new Error('Nascimento é requirido');
        }

        const userExists = await Usuario.findOne({ cpf: cpf })

        if (userExists) {
            throw new Error('Cpf ja cadastrado');

        }

        const usuario = new Usuario({
            nome,
            cpf,
            nascimento,
        })


        return await usuario.save()

    }
    usuarioServices.detalhes = async function (_id) {

        const user = await Usuario.findOne({ _id });
        return user;
       
    }

    usuarioServices.update = async function( _id, nome, nascimento ){
        const usuario = {
            nome,
            nascimento,
        }
        try {
            const updatedUsuario = await Usuario.updateOne({ _id }, usuario)
            console.log(updatedUsuario)
            if (updatedUsuario.matchedCount === 0) {
                throw new Error('Usuario nao encontrado')
               
            }
            return usuario;
        }
        catch (error) {
            throw new Error('Erro')
        }

    }

    return usuarioServices;

})()



