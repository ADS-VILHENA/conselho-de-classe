import React, { useState } from 'react';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { Table, Button, Badge } from 'react-bootstrap';


import './styles.css';
import Header from '../../components/header';

export default function Diagnostic() {
    const history = useHistory();

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">
                    <span className="backButton" onClick={() => { history.goBack() }} ><FaArrowLeft size={30} color='black' /></span>
                    Diagnostico de Turma
                </h1>
                <div className="container" >
                    <h1 className="subtitle">Selecione o periodo</h1>
                    <div className="containerSection justify-content-md-center">
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="1" name="semestre" />
                                1º Semestre
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="1" name="semestre" />
                                2º Semestre
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="1" name="semestre" />
                                3º Semestre
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="1" name="semestre" />
                                4º Semestre
                            </label>
                        </div>
                    </div>


                    <h1 className="subtitle">Defina o Perfil da Turma</h1>
                    <div className="containerSection justify-content-md-center">
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="1" name="perfil" />
                                Participativa
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="2" name="perfil" />
                                Produtiva
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="3" name="perfil" />
                                Apática
                            </label>
                        </div>
                        <div className="cardv2">
                            <label className="radioPereido">
                                <input type="radio" value="4" name="perfil" />
                                Indiciplinada
                            </label>
                        </div>
                    </div>

                    <h1 className="subtitle">Avaliação de Alunos</h1>
                    <div className="tableCard justify-content-md-center">
                        <Table striped hover >
                            <thead>
                                <tr>
                                    <th width={'5%'} >#</th>
                                    <th width={'40%'}>Aluno</th>
                                    <th>Observações</th>
                                    <th width={'10%'}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>
                                        <Badge className="observation" variant="success">Bom Aluno</Badge>
                                        <Badge className="observation" variant="primary">Realiza tarefa</Badge>
                                        <Badge className="observation" variant="warning">Dificuldade</Badge>
                                    </td>
                                    <td><Button className="buttonAction" variant="primary"><FiEdit size={20} color='white' /></Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>
                                        <Badge className="observation" variant="success">Bom Aluno</Badge>
                                        <Badge className="observation" variant="primary">Realiza tarefa</Badge>
                                        <Badge className="observation" variant="warning">Dificuldade</Badge>
                                        <Badge className="observation" variant="success">Bom Aluno</Badge>
                                        <Badge className="observation" variant="primary">Realiza tarefa</Badge>
                                        <Badge className="observation" variant="warning">Dificuldade</Badge>
                                    </td>
                                    <td><Button className="buttonAction" variant="primary"><FiEdit size={20} color='white' /></Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                    <td>
                                        <Badge className="observation" variant="success">Bom Aluno</Badge>
                                        <Badge className="observation" variant="primary">Realiza tarefa</Badge>
                                        <Badge className="observation" variant="warning">Dificuldade</Badge>
                                    </td>
                                    <td><Button className="buttonAction" variant="primary"><FiEdit size={20} color='white' /></Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </div>

            </section>
        </div>
    );
}

