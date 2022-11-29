const usersServices = require('../services/Services');

module.exports = {

    async create(req, res) {
        const { nome, cpf, nascimento } = req.body;
        try {
            const user = await usersServices.newCreate(nome, cpf, nascimento)
            return res.status(201).json(user);

        } catch (error) {
            return res.status(422).json({ error: error.message })
        }
    },

    async index(req, res) {
        return res.status(200).json(await usersServices.index());
    },

    async details(req, res) {
        const { _id } = req.params;
        return res.status(200).json(await usersServices.details(_id));
    },

    async update(req, res) {
        const { _id } = req.params;
        const { nome, nascimento } = req.body;
        try {
            const user = await usersServices.update(_id, nome, nascimento)
            return res.status(200).json(user);

        } catch (error) {
            return res.status(422).json({ error: error.message })
        }
    },

    async delete(req, res) {
        const { _id } = req.params;
        return res.status(200).json(await usersServices.delete(_id));
    },

}