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
    const [alunos, setAlunos] = useState([]);
    const { serie_id } = useParams();
    const [editing, setEditing] = useState({})

    useEffect(() => { 
        getData();
    }, []);
 

    //Busca dados da API
    async function getData (){
        await api.get(`/periodo/serie/${serie_id}`).then(response => { 
            setPeriodos(response.data); 
        }).catch(err => { 
           console.error(err);
        });
        
        await api.get('/perfil_turma').then(response => { 
            setPerfils(response.data); 
        }).catch(err => { 
            console.error(err);
        });

        await api.get('/diagnostico/serie/aluno', {
            params: { 
              serie_id: serie_id
            }
          }).then(response => { 
            setAlunos(response.data); 
        }).catch(err => { 
            console.error(err);
        });
    }

    useEffect(() => {
        if(editing.idAluno != undefined){
            setModalShow(true)
        }
            
    },[editing])
    

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
                                {
                                    alunos.map(aluno => (
                                        <tr>
                                            <td>{aluno.idAluno}</td>
                                            <td>{aluno.nomeAluno}</td>
                                            <td>
                                                {
                                                    aluno.indice.map( indice => (
                                                        <Badge className="observation" variant={indice.classe.toLowerCase()}>{indice.desc}</Badge>
                                                    ))
                                                } 
                                            </td>
                                            <td><FiEdit size={20} color='primary' onClick={() => setEditing(aluno)} /></td>
                                        </tr>
                                    ))
                                }
                             </tbody> 
                        </Table>
                    </div>

                    <div className={"diagnosticActions"}>
                        <Button style={{ margin: 10, marginTop: 20, height: 50 }} 
                            variant="outline-secondary"
                            onClick={() => { history.goBack() }} >Cancelar</Button>
                        <Button style={{ margin: 10, marginTop: 20, height: 50 }} variant="success">Salvar</Button>
                    </div>
                </section>
            </div>

            <ModalEditAluno show={modalShow} editAluno={editing} onHide={() => setModalShow(false)}/>
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
            <Table striped hover >
                            <thead>
                                <tr>
                                    <th width={'5%'} >#</th>
                                    <th width={'40%'}>Aluno</th>
                                    <th>Observações</th> 
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td>{props.editAluno.idAluno}</td>
                                    <td>{props.editAluno.nomeAluno}</td>
                                    <td>
                                        {
                                            (props.editAluno.idAluno != undefined) ? 
                                            props.editAluno.indice.map( indice => (
                                                <Badge className="observation" variant={indice.classe.toLowerCase()}>{indice.desc}</Badge>
                                            )) : <Badge className="observation" variant="info">Sem dados</Badge>
                                        } 
                                    </td> 
                                </tr> 
                             </tbody> 
                        </Table>
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