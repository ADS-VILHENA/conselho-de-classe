import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import { Table, Button, Badge, Modal } from 'react-bootstrap';

import Header from '../../components/header';
import api from '../../services/api';

import './styles.css';


export default function Diagnostic() {
    const history = useHistory();
    const [periodos, setPeriodos] = useState([]);
    const [perfils, setPerfils] = useState([]);
    const [diagnostic, setDiagnostic] = useState({ periodo: "", perfil: "" });
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        //setPeriodos(INITIAL_PERIODOS);
        //setPerfils(INITIAL_PERFILS);
        getData();
    }, []);

    useEffect(() => {
        console.log(JSON.stringify(diagnostic));
    }, [diagnostic]);

    //Busca dados da API
    async function getData (){
        await api.get(`/periodo/serie/${id}`).then(response => {
            console.log(response.data)
            setPeriodos(response.data); 
        }).catch(err => { 
            alert(err);
        });
        
        await api.get('/perfil_turma').then(response => { 
            setPerfils(response.data); 
        }).catch(err => { 
            alert(err);
        });
    }
    

    return (
        <div className="main-container">
            <Header />

            <div className="main-content">
                <section>
                    <h1 className="titlePage">
                        <span className="backButton" onClick={() => { history.goBack() }} ><FiArrowLeft size={30} /></span>
                    Diagnostico de Turma
                    </h1>

                    <h1 className="subtitle">Selecione o periodo</h1>
                    <ul className="cardOptionContainer">
                        {periodos.map(periodo => (
                            <div className={diagnostic.periodo === periodo.id ? "cardOptionActive" : "cardOptionContent"}
                                key={periodo.id}
                                onClick={() => setDiagnostic({ ...diagnostic, periodo: periodo.id })} >
                                <div className="optionContent">
                                    <span>{periodo.nome}</span>
                                </div>
                            </div>
                        ))
                        }
                    </ul>

                    <h1 className="subtitle">Defina o Perfil da Turma</h1>
                    <ul className="cardOptionContainer">
                        {perfils.map(perfil => (
                            <div className={diagnostic.perfil === perfil.idPerfil ? "cardOptionActive" : "cardOptionContent"}
                                key={perfil.idPerfil.toString()}
                                onClick={() => setDiagnostic({ ...diagnostic, perfil: perfil.idPerfil })} >
                                <div className="optionContent">
                                    <span>{perfil.descricao}</span>
                                </div>
                            </div>
                        ))
                        }
                    </ul>


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
                                    <td><FiEdit size={20} color='primary' onClick={() => setModalShow(true)} /></td>
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
                                    <td><FiEdit size={20} color='primary' onClick={() => setModalShow(true)}/></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                    <td>
                                        <Badge className="observation" variant="success">Bom Aluno</Badge>
                                        <Badge className="observation" variant="primary">Realiza tarefa</Badge>
                                        <Badge className="observation" variant="warning">Dificuldade</Badge>
                                    </td>
                                    <td><FiEdit size={20} color='primary' onClick={() => setModalShow(true)}/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div className={"diagnosticActions"}>
                        <Button style={{ margin: 10, marginTop: 20, height: 50 }} variant="outline-secondary">Cancelar</Button>
                        <Button style={{ margin: 10, marginTop: 20, height: 50 }} variant="success">Salvar</Button>
                    </div>
                </section>
            </div>

            <ModalEditAluno show={modalShow} onHide={() => setModalShow(false)}/>
        </div>


    ); 
}

function ModalEditAluno(props) {
    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header>
                <Modal.Title>Adicionar Observações</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.onHide}>
                    Fechar
                    </Button>
                <Button variant="success" onClick={props.onHide}>
                    Salvar
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}