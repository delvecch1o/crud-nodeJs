import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { Container, Form, Label, Input, LabelError, Button, LabelLogin, Strong } from './styles';
import axios from 'axios';

function EditarUsuarios() {

    const history = useHistory();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [nascimento, setNascimento] = useState();
    const [error, setError] = useState();

    const { idUsuario } = useParams();

    async function getUsers() {
        const response = await axios.get('/api/details/' + idUsuario);
        setNome(response.data.nome);
        setCpf(response.data.cpf);
        setNascimento(response.data.nascimento);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const submitEdit = (e) => {
        e.preventDefault();
        if (!nome | !nascimento) {
            setError("Preencha todos os campos");
            return;
        }

        const data = {
            nome: nome,
            cpf: cpf,
            nascimento: nascimento,
            _id: idUsuario,
        }

        axios.put('/api/register/' + idUsuario, data)
            .then(response => {
                alert("Usuário atualizado com Sucesso");
                history.push('/listar');
            })
            .catch((error) => {
                alert("Erro \n" + error.response.data.error);
            });

    }

    return (
        <Container>
            <Label>Atualizar dados do Usuário</Label>
            <Form onSubmit={submitEdit} >
                <Input
                    type='text'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input disabled
                    value={cpf}

                />

                <Input
                    type="date"
                    value={nascimento}
                    onChange={(e) => [setNascimento(e.target.value), setError("")]}

                />

                <LabelError>{error}</LabelError>
                <Button type='submit'>Atualizar</Button>
                <LabelLogin>
                    Lista de Usuários Cadastrados
                    <Strong>
                        <Link to="/listar">&nbsp;Listar</Link>
                    </Strong>
                </LabelLogin>
            </Form>
        </Container>
    )

}

export default EditarUsuarios