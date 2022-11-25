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
        // console.log(data);

         
         axios.post('/api/cadastro', data)
         .then(res => {
            if(res.status === 201){
                history.push('/listar'); 
            }else{
                alert('Não foi possivel cadastrar usuario');
            }
            
         });


        
         
        

    }


    return (
        <Container>
            <Label>Cadastre um Usuario</Label>
            <Form onSubmit={submitRegister} >
                <Input
                    type='text'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type='number'
                    placeholder='Digite seu CPF'
                    value={cpf}
                    onChange={(e) => [setCpf(e.target.value), setError("")]}
                />

                <Input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={nascimento}
                    onChange={(e) => [setNascimento(e.target.value), setError("")]}
                />

                <LabelError>{error}</LabelError>
                <Button type='submit'>Cadastrar</Button>
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