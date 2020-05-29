import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';   
import {  FiMonitor, FiSettings, FiHome, FiGlobe, FiPieChart  } from 'react-icons/fi';


import './styles.css';
import Header from '../../components/header';



export default function Panel() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        // buscar dados da API
        setTurmas([
            {
                id: "ac246",
                nome: "Informática",
                icon: FiMonitor
            },
            {
                id: "ac94654",
                nome: "Edificações",
                icon: FiHome
            },
            {
                id: "ab6461",
                nome: "Eletromecânica",
                icon: FiSettings
            },
            {
                id: "asd554",
                nome: "Matemática",
                icon: FiPieChart
            },
            {
                id: "asd418",
                nome: "Linguas",
                icon: FiGlobe
            }
        ]);
    }, []);

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Painel - Selecione um Curso</h1>
                <ul  >
                    {turmas.map(turma => (
                        <li key={turma.id} >  
                            <turma.icon size={60} color='gray'  />
                            <Link className="link" to={`/monitor/${turma.id}`}>{turma.nome}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}