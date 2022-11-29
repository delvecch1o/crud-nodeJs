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
        // console.log(response.data);
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
                console.log(error.response.data);
                // alert('ERRO',data.message);
                alert("Erro não foi Possível atualizar usuario");
            });

        /*

        axios.put('/api/register/' + idUsuario, data)
            .then(res => {
                if (res.status === 200) {
                    alert("Usuario atualizado com Sucesso")
                    history.push('/listar');
                } else {
                    alert("Não foi possivel atualizar o usuario");
                }

            });
            
            */

    }


    return (
        <Container>
            <Label>Editar Usuário</Label>
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
                <Button type='submit'>Editar</Button>
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