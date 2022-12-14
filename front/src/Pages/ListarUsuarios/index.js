import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import { Table, Thead, Th, Tr, Tbody, Td, Container, Label, Strong, TdIcone } from './styles';
import { FaTrash, FaEdit } from "react-icons/fa";

function ListarUsuarios() {
    const history = useHistory();
    const [users, setUsers] = useState([]);


    async function getUsers() {
        const response = await axios.get('/api/register');
        setUsers(response.data)
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Deseja realmente excluir esse usário ? ")) {
            var result = await axios.delete('/api/register/' + id);
            if (result.status === 200) {
                alert("Usuário excluido com Sucesso");
                history.push('/listar');
            }
        }

    }

    const navegar = (key) => {
        history.push({
            pathname: key,
        });
    };

    return (

        <Container>
            <Label>
                Deseja Cadastar um Novo Usuário ?
                <Strong>
                    <Link to="/"> Cadastrar</Link>
                </Strong>
            </Label>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>CPF</Th>
                        <Th>Data de Nascimento</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((item, i) => (
                        <Tr key={i}>
                            <Td >{item.nome}</Td>
                            <Td >{item.cpf}</Td>
                            <Td >{new Date(item.nascimento).toLocaleString('pt-bt')}</Td>

                            <TdIcone alignCenter width="5%">
                                <FaEdit onClick={() => navegar("/editar/" + item._id)} />
                            </TdIcone>

                            <TdIcone alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item._id)} />
                            </TdIcone>
                        </Tr>
                    ))}

                </Tbody>
            </Table>
        </Container>

    )
}

export default ListarUsuarios