import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiUser, FiArrowLeft } from 'react-icons/fi';
import Chart from "react-apexcharts";
import { Badge } from 'react-bootstrap';

import './styles.css';
import Header from '../../components/header';
import api from '../../services/api';


const categoriesCol = ['1º Sem.', '2º Sem.', '3º Sem.', '4º Sem.'];

const optionsMedia = {
  chart: {
    toolbar: {
      show: false,
    }
  },
  colors: [({ value }) => setGraphColor(value)],
  yaxis: { min: 0, max: 100 },
  xaxis: {
    categories: categoriesCol
  }
};
const optionsNota = {
  chart: {
    toolbar: {
      show: false,
    }
  },
  yaxis: { min: 0, max: 100 },
  xaxis: {
    categories: categoriesCol
  }
};


export default function Monitor() {

  const history = useHistory();

  const [notaGeral, setNotaGeral] = useState([{ data: [0, 0, 0, 0] }]);
  const [notaDisciplina, setNotaDisciplina] = useState([{ data: [0, 0, 0, 0] }]);
  const [mediaGeral, setMediaGeral] = useState(0); 
  const [mediaDisciplina, setMediaDisciplina] = useState(0); 
  const [selected, setSelected] = useState({ id: 1,nome: "Não há alunos cadastrados", notas: []});

  const [alunos, setAlunos] = useState([]);
  const [nomeTurma, setNomeTurma] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [perfilAluno, setPerfilAluno] = useState([]);
  const [disciplina, setDisciplina] = useState(0);

  const { serie_id } = useParams();

  useEffect(() => {
    getDados();        
  }, []);

  useEffect( () => { 
    
    findPerfilAluno();
    findMediaGeral(); 
    findNotaDisciplina();

  }, [selected]);

  useEffect(() => {
    findNotaDisciplina()
  },[disciplina])
  async function findMediaGeral(){ 
    await api.get(`/aluno/notas/periodo`, {
      params: {
        aluno_id: selected.id,
        serie_id: serie_id
      }
    }).then(response => {   
      setNotaGeral([{ data: response.data.notas }]);  
      let _mediaGeral = 0;
      for (let i = 0; i < response.data.notas.length; i++) {
        _mediaGeral += response.data.notas[i];
      }
      _mediaGeral = _mediaGeral / response.data.notas.length;
      setMediaGeral(_mediaGeral);
      
    }).catch(err => {
      console.error("Media Geral: " + err);
    });
 
  }

  async function findNotaDisciplina(){
    setNotaDisciplina([{ data: [0,0,0,0] }])
    setMediaDisciplina(0);
    await api.get(`/aluno/disciplina`, {
      params: {
        idAluno: selected.id,
        idDisciplina: disciplina
      }
    }).then(response => {  
      setNotaDisciplina([{ data: response.data.notas }])
      if(response.data.notas != undefined){
        let _mediaDisciplina = 0;
        for (let i = 0; i < response.data.notas.length; i++) {
          _mediaDisciplina += response.data.notas[i];
        }
        _mediaDisciplina = _mediaDisciplina / response.data.notas.length;
        setMediaDisciplina(_mediaDisciplina);
      }
      
      
    }).catch(err => {
      console.error("atualizarChartDisciplina: " + err);
    });
  }

  async function findPerfilAluno(){
    
    await api.get(`/diagnostico/aluno/serie`, {
      params: {
        idAluno: selected.id,
        idSerie: serie_id
      }
    }).then(response => {   
      setPerfilAluno(response.data);       
    }).catch(err => {
      console.error("Notas: " + err);
    });
  }

  async function getDados() {
    await api.get(`/turma/serie/${serie_id}`).then(response => {
      setNomeTurma(response.data[0].nome);
    }).catch(err => {
      console.error("Turmas: " +  err);
    });
    await api.get(`/aluno/serie/${serie_id}`).then(response => { 
      setAlunos(response.data);
      if(response.data.length > 0){
        setSelected(response.data[0]);
      }      
    }).catch(err => {
      console.error("Alunos: " + err);
    }); 
    await api.get(`/disciplina/serie/${serie_id}`).then(response => {
      setDisciplinas(response.data); 
    }).catch(err => {
      console.error("Disciplinas: " + err);
    }); 

  }

 


  /*********************/
  return (
    <div className="main-container">
      <Header />

      <div className="main-content">


        <section>
          <h1 className="titlePage">
            <span className="backButton" onClick={() => { history.goBack() }} >
              <FiArrowLeft size={30} />
            </span>
            {`Monitorar turma - ${nomeTurma}`}
          </h1>


          <ul className="cardAlunoContainer">
            {alunos.map(aluno => (
              <div className={aluno.id === selected.id ? "cardAlunoActive" : "cardAlunoContent"} key={aluno.id} onClick={() => setSelected(aluno)} >
                <div className="alunoContent">
                  <FiUser size={20} />
                  <span>{aluno.nome}</span>
                </div>
              </div>
            ))
            }
          </ul>

          <div className="alunoSelected">
            <span className="subtitle">{selected.nome}</span>
            <div className="perfilContainer">
              { 
                 (perfilAluno.length > 0) ? perfilAluno.map(perfil => (
                  <Badge className="observation" variant={perfil.indice[0].classe.toLowerCase()}>{perfil.indice[0].desc}</Badge>
                )) : <Badge className="observation" variant="primary">Sem Observações</Badge>
              }
            </div>
            
          </div>


          <div className="chartsContainer">
            <div className="chartContent">
              <div className="chartHeader">
                <span>{`Media Geral - ${mediaGeral.toFixed(2)}`}</span>
              </div>

              <Chart
                style={{ margin: 10 }}
                options={optionsMedia}
                series={notaGeral}
                type="bar"
              />
            </div>
            <div className="chartContent">
              <div className="chartHeader">
                <span>{`Media Disciplina - ${mediaDisciplina.toFixed(2)}`}</span>
                <select style={{ width: 200, marginLeft: 10 }} onChange={(e) => setDisciplina(e.target.value)}> 
                  {
                    
                    disciplinas.map(item => (
                      <option value={item.id}>{item.nome}</option>
                    ))
                  }
                </select>
              </div>

              <Chart
                style={{ margin: 10 }}
                options={optionsNota}
                series={notaDisciplina}
                type="area"
              />
            </div>
          </div>

        </section>
      </div>
    </div>

  );
}


function setGraphColor(value) {
  if (value > 90)
    return '#0082FF'
  else if (value > 69)
    return '#009700'
  else if (value > 59)
    return '#5AB7D4'
  else if (value > 49)
    return '#D45B00'
  else
    return '#FF0000'
}