const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: { type: 'String', required: true },
    cpf: { type: 'String', required: true, index: { unique: true } },
    nascimento: { type: 'Date', required: true }
}, {
    timestamps: true
});

const usuarios = mongoose.model('Usuarios', DataSchema);

module.exports = usuarios;