const Usuario = require('../models/Pessoa');
const usuarioServices = require('../services/usuarioServices');


module.exports = {

    async index(req, res) {
        const user = await Usuario.find();
        res.json(user);
    },

    async create(req, res) {
        const { nome, cpf, nascimento } = req.body;
        try {
            const user = await usuarioServices.salvarNova(nome, cpf, nascimento)
            return res.status(201).json(user);

        } catch (error) {

            return res.status(422).json({ error: error.message })
        }

    },


    async detalhes(req, res) {
        const { _id } = req.params;
       
            
            return res.status(200).json(await usuarioServices.detalhes( _id ));
            
    },

    async delete(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findByIdAndDelete({ _id });
        return res.json("Usuario deletado com sucesso");
    },

    async update(req, res) {
        const { _id } = req.params;
        const { nome, nascimento } = req.body;
        try {
            const user = await usuarioServices.update( _id , nome, nascimento)
            return res.status(200).json(user);

        } catch (error) {

            return res.status(422).json({ error: error.message })
        }

      

    },

}


/*




    async create(req, res) {
        var pessoaNova = req.body;
        usuarioServices.salvarNova(pessoaNova).then(function(pessoa){
            if(pessoa){
                res.status(200);
                res.json(pessoaNova);
                return;
            }
            res.status(400);
            res.send('Pessoa com esse cpf ja Cadastrada');
        });
    }

     async update(req,res){
        const { _id , nome, cpf, nascimento}  = req.body;
        
        let dataCreate = {}

        dataCreate = { nome, cpf, nascimento}

        const user = await Usuario.findByIdAndUpdate({_id}, dataCreate, {new: true});

        res.json(user)
    }

     async create(req, res) {

        const { nome, cpf, nascimento } = req.body

        if (!nome) {
            return res.status(422).json({ msg: 'O nome é obrigatorio !' })
        }
        if (!cpf) {
            return res.status(422).json({ msg: 'O cpf é obrigatorio !' })
        }

        if (!nascimento) {
            return res.status(422).json({ msg: 'A data de nascimento é obrigatorio !' })
        }

        const userExists = await Usuario.findOne({ cpf: cpf })

        if (userExists) {
            return res.status(422).json({ msg: 'CPF ja cadastrado' })

        }

        const usuario = new Usuario({
            nome,
            cpf,
            nascimento,
        })

        try {
            await usuario.save()
            res.status(201).json({ msg: 'Usuario cadastrado com sucesso' })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Erro no servidor'
            })
        }

    },

      const { _id } = req.params;

        const { nome, cpf, nascimento } = req.body

        const usuario = {
            nome,
            cpf,
            nascimento,
        }
        try {
            const updatedUsuario = await Usuario.updateOne({ _id }, usuario)
            console.log(updatedUsuario)
            if (updatedUsuario.matchedCount === 0) {
                res.status(422).json({ msg: 'Usuario nao encontrado' })
                return
            }
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(500).json({ error: error })
        }


    */

