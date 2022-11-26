const Usuario = require('../models/Person');


function verificaPrimeiroDigito(cpf) {
    const Inputcpf = cpf.split('').map((e) => parseInt(e));
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += Inputcpf[i] * (10 - i);
    }
    const resto = (soma * 10) % 11;
    if (resto < 10) {
        return Inputcpf[9] == resto;
    }
    return Inputcpf[9] == 0;

}

function verificaSegundoDigito(cpf) {
    const Inputcpf = cpf.split('').map((e) => parseInt(e));
    let soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += Inputcpf[i] * (11 - i);
    }
    const resto = (soma * 10) % 11;
    if (resto < 10) {
        return Inputcpf[10] == resto;
    }
    return Inputcpf[10] == 0;

}

function validaDigitosRepitidos(cpf) {
    const Inputcpf = cpf.split('').map((e) => parseInt(e));
    const primeiroDigito = Inputcpf[0];
    let digitoDiferente = false;
    for (let i = 1; i < Inputcpf.length; i++) {
        if (Inputcpf[i] != primeiroDigito) {
            digitoDiferente = true;
        }
    }
    return digitoDiferente;
}

function validarCPF(cpf) {
    if (cpf.length != 11) {
        throw new Error('CPF com tamanho inválido');
    }
    if (!validaDigitosRepitidos(cpf)) {
        throw new Error('CPF com digitos iguais não pode cadastrar');
    }
    if (!verificaPrimeiroDigito(cpf)) {
        throw new Error('Verificador do Primeiro digito incorreto');
    }
    if (!verificaSegundoDigito(cpf)) {
        throw new Error('Verificador do Segundo digito incorreto');
    }

    return cpf
}


module.exports = (function () {
    var usersServices = {};

    usersServices.newCreate = async function (nome, cpf, nascimento) {

        if (!nome) {
            throw new Error('O nome é obrigatório!');
        }
        if (!cpf) {
            throw new Error('O CPF é obrigatório!');
        }
        if (!nascimento) {
            throw new Error('A data  de nascimento é obrigatório!');
        }

        const cpfValido = validarCPF(cpf);
        const userExists = await Usuario.findOne({ cpf: cpf })

        if (userExists) {
            throw new Error('O CPF ja está cadastrado');

        }

        const usuario = new Usuario({
            nome,
            cpf,
            nascimento,
        })


        return await usuario.save()

    }

    usersServices.index = async function () {
        const user = await Usuario.find();
        return user;
    }

    usersServices.details = async function (_id) {

        const user = await Usuario.findOne({ _id });
        return user;

    }

    usersServices.update = async function (_id, nome, nascimento) {
        const usuario = {
            nome,
            nascimento,
        }
        if (!nome) {
            throw new Error('O nome é obrigatório!');
        }
        if (!nascimento) {
            throw new Error('A data  de nascimento é obrigatório!');
        }
        try {
            const updatedUsuario = await Usuario.updateOne({ _id }, usuario)
            if (updatedUsuario.matchedCount === 1) {
                return usuario;

            }
        }
        catch (error) {
            throw new Error('Usuario nao encontrado')
        }

    }

    usersServices.delete = async function (_id) {

        const user = await Usuario.findByIdAndDelete({ _id });
        return user;
    }

    return usersServices;

})()