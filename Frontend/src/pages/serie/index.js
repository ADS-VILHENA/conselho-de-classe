import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiMonitor, FiActivity, FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import '../../global.css'
import Header from '../../components/header';
import api from '../../services/api'

export default function Serie() {
    const [serie, setSerie] = useState([]); 
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSerie()
    }, [])

    async function getSerie() {
        await api.get(`/serie/${id}`).then(reponse => {
            setSerie(reponse.data)
        }).catch(err => {
            alert(err)
        })
    }
    useEffect(() => {
        // buscar dados da API 
        getSerie();
    }, []);


    return (
        <div className="main-container">
            <Header />

            <div className="main-content">

                <section>
                    <h1 className="titlePage">
                        <span className="backButton" onClick={() => { history.goBack() }} >
                            <FiArrowLeft size={30}/>
                        </span> 
                        Selecione uma serie   
                    </h1>
                    <ul className="mainUlContainer">
                        {serie.map(serie => (
                            <div className="cardSerie"  key={serie.id} >
                                <div className="cardContainer">
                                    <div className="serieTitle">
                                        <span>{serie.nome}</span>
                                    </div> 
                                    <div className="cardContent">
                                        <Link className="cardLink" to={`/monitor/${serie.id}`}>
                                            <FiMonitor size={30} color='gray' /> Monitorar
                                        </Link>
                                        <Link className="cardLink" to={`/diagnostic/${serie.id}`}>
                                            <FiActivity size={30}  color='gray' /> Diagnosticar
                                        </Link>
                                    </div>
                                   
                                </div>
                            </div>

                        ))} 
                    </ul>
                </section>
            </div>
        </div>
    );
}