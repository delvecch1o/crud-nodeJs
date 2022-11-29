import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Form, Label, Input, LabelError, Button, LabelLogin, Strong } from './styles';
import axios from 'axios';

function CadastrarUsuarios() {

    const history = useHistory();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [nascimento, setNascimento] = useState();
    const [error, setError] = useState();

    const submitRegister = (e) => {
        e.preventDefault();
        if (!nome | !cpf | !nascimento) {
            setError("Preencha todos os campos");
            return;
        }

        const data = {
            nome: nome,
            cpf: cpf,
            nascimento: nascimento,
        }

        axios.post('/api/register', data)
            .then(response => {
                alert('Usuário Cadastrado com Sucesso');
                history.push('/listar');
            })
           
            .catch((error) => {
               console.log(error.response.data.error)
            alert("ERRO \n" + error.response.data.error);
            // alert(error.response.data.error);
            });


        /*
           
             axios.post('/api/register', data)
             .then(res => {
                if(res.status === 201){
                    alert('Usuario Cadastrado com sucesso');
                    history.push('/listar'); 
                } else{
                    alert('Não foi possivel cadastrar usuario');
                }
                
             });
    
             */


    }


    return (
        <Container>
            <Label>Cadastre um Usuário</Label>
            <Form onSubmit={submitRegister} >
                <Input
                    type='text'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type='textNumber'
                    placeholder='Digite seu CPF'
                    value={cpf}
                    onChange={(e) => [setCpf(e.target.value), setError("")]}
                    maxLength="11"
                />

                <Input
                    type="date"
                    value={nascimento}
                    onChange={(e) => [setNascimento(e.target.value), setError("")]}
                />

                <LabelError>{error}</LabelError>
                <Button type='submit'>Cadastrar</Button>
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

export default CadastrarUsuarios