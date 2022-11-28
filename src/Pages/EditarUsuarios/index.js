import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { Container, Form, Label, Input, LabelError, Button, LabelLogin, Strong } from './styles';
import axios from 'axios';

function CadastrarUsuarios() {

    const history = useHistory();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [nascimento, setNascimento] = useState();
    const [error, setError] = useState();

    const { idUsuario } = useParams();

    async function getUsers() {
        const response = await axios.get('/api/details/' + idUsuario);
       // console.log(response.data);
        setNome(response.data.nome);
        setCpf(response.data.cpf);
        setNascimento(response.data.nascimento);
        
    }

    useEffect(() => {
        getUsers();
    }, []);

   

    const submitRegister = (e) => {
        e.preventDefault();

        const data = {
            nome: nome,
            cpf: cpf,
            nascimento: nascimento,
            _id: idUsuario,
        }

        axios.put('/api/register/' + idUsuario, data)
            .then(res => {
                if (res.status === 200) {
                    history.push('/listar');
                } else {
                    alert('Não foi possivel atualizar o usuario');
                }

            });

    }


    return (
        <Container>
            <Label>Editar Usuario</Label>
            <Form onSubmit={submitRegister} >
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
                    placeholder="Data de Nascimento"
                    value={nascimento}
                    onChange={(e) => [setNascimento(e.target.value), setError("")]}
                />

                <LabelError>{error}</LabelError>
                <Button type='submit'>Editar</Button>
                <LabelLogin>
                    Lista de Usuarios Cadastrados
                    <Strong>
                        <Link to="/listar">&nbsp;Listar</Link>
                    </Strong>
                </LabelLogin>
            </Form>
        </Container>
    )

}

export default CadastrarUsuarios