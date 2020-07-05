import React, { useState, useEffect, Children } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiUser, FiArrowLeft } from 'react-icons/fi';
import Chart from "react-apexcharts";

import './styles.css';
import Header from '../../components/header';

import ApexCharts from 'apexcharts'

const INITIAL_ALUNOS = [{
  id: "a1",
  name: "Wallyson Silva",
  notas: [30, 85, 99, 12]
}, {
  id: "va",
  name: "Marcos Santos",
  notas: [70, 30, 60, 90]
}, {
  id: "a5",
  name: "Silva de Souza",
  notas: [56, 65, 89, 100]
}, {
  id: "as",
  name: "Nathalia Maria",
  notas: [80, 80, 50, 90]
}, {
  id: "eq",
  name: "Sergio Marcos",
  notas: [10, 80, 99, 70]
  
}, {
  id: "8e",
  name: "Alan Gonsalves",
  notas: [90, 85, 99, 60]
}, {
  id: "59",
  name: "Rodrigues Nogueira",
  notas: [55, 85, 50, 70]
}, , {
  id: "aa",
  name: "Silva de Souza",
  notas: [85, 85, 99, 60]
}, {
  id: "fa",
  name: "Nathalia Maria",
  notas: [60, 70, 60, 85]
}];

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
  const [alunos, setAlunos] = useState([]);
  const [serieMedia, setSerieMedia] = useState([{ data: [0, 0, 0, 0] }]);
  const [serieNota, setSerieNota] = useState([{ data: [0, 0, 0, 0] }]);
  const [selected, setSelected] = useState({})



  useEffect(() => {
    setAlunos(INITIAL_ALUNOS);
  }, []);

  useEffect(() => {
    setSerieMedia([{ data: selected.notas }]);
    setSerieNota([{ data: selected.notas }]);
  }, [selected]);


  return (
    <div className="main-container">
      <Header />

      <div className="main-content">


        <section>
          <h1 className="titlePage">
            <span className="backButton" onClick={() => { history.goBack() }} >
              <FiArrowLeft size={30} />
            </span>
            Monitorar turma
          </h1>


          <ul className="cardAlunoContainer">
            {alunos.map(aluno => (
              <div className={aluno.id === selected.id ? "cardAlunoActive" : "cardAlunoContent"} key={aluno.id} onClick={() => setSelected(aluno)} >
                <div className="alunoContent">
                  <FiUser size={20} />
                  <span>{aluno.name}</span>
                </div>
              </div>
            ))
            }
          </ul>
          
          <div className="alunoSelected">
            <h1 className="subtitle">{selected.name || 'Selecione um Aluno'}</h1>
          </div>


          <div className="chartsContainer">
            <Chart className="chartContent"
              options={optionsMedia}
              series={serieMedia}
              type="bar"
            />
            <Chart className="chartContent"
              options={optionsNota}
              series={serieNota}
              type="area"
            />
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