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

  const [serieMedia, setSerieMedia] = useState([{ data: [0, 0, 0, 0] }]);
  const [serieNota, setSerieNota] = useState([{ data: [0, 0, 0, 0] }]);
  const [mediaGeral, setMediaGeral] = useState(0); 
  const [selected, setSelected] = useState({ id: 1,nome: "Não há alunos cadastrados", notas: []});

  const [alunos, setAlunos] = useState([]);
  const [nomeTurma, setNomeTurma] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [perfilAluno, setPerfilAluno] = useState([]);
  const [notaDisciplina, setNotaDisciplina] = useState([0,0,0,0]);

  const { serie_id } = useParams();

  useEffect(() => {
    getDados();        
  }, []);

  useEffect( () => { 

    setSerieMedia([{ data: selected.notas }]);

    if (selected.notas !== undefined) {
      let _mediaGeral = 0;
      for (let i = 0; i < selected.notas.length; i++) {
        _mediaGeral += selected.notas[i];
      }
      _mediaGeral = _mediaGeral / selected.notas.length;
      setMediaGeral(_mediaGeral);
      getPerfilAluno();
    } 

  }, [selected]);

  async function getPerfilAluno(){
    
    await api.get(`/diagnostico/aluno/serie`, {
      params: {
        idAluno: selected.id,
        idSerie: serie_id
      }
    }).then(response => {  
      console.log(response.data);
      setPerfilAluno(response.data);       
    }).catch(err => {
      alert("Notas: " + err);
    });
  }

  async function getDados() {
    await api.get(`/turma/serie/${serie_id}`).then(response => {
      setNomeTurma(response.data.nome);
    }).catch(err => {
      alert("Turmas: " +  err);
    });
    await api.get(`/aluno/serie/${serie_id}`).then(response => { 
      setAlunos(response.data);
      if(response.data.length > 0){
        setSelected(response.data[0]);
      }
      
    }).catch(err => {
      alert("Alunos: " + err);
    }); 
    await api.get(`/disciplina/serie/${serie_id}`).then(response => {
      setDisciplinas(response.data); 
    }).catch(err => {
      alert("Disciplinas: " + err);
    }); 

  }

  async function atualizarChartDisciplina(idDisciplina){
    await api.get(`/aluno/disciplina`, {
      params: {
        idAluno: selected.id,
        idDisciplina: idDisciplina
      }
    }).then(response => {  
      setSerieNota([{ data: response.data.notas }])
    }).catch(err => {
      alert("atualizarChartDisciplina: " + err);
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
                series={serieMedia}
                type="bar"
              />
            </div>
            <div className="chartContent">
              <div className="chartHeader">
                <span>{`Media Disciplina - 0`}</span>
                <select style={{ width: 200, marginLeft: 10 }} onChange={(e) => atualizarChartDisciplina(e.target.value)}> 
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
                series={serieNota}
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
  else if (value > 70)
    return '#009700'
  else if (value > 60)
    return '#5AB7D4'
  else if (value > 50)
    return '#D45B00'
  else
    return '#FF0000'
}