import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';   
import { FaUserGraduate } from 'react-icons/fa';


import './styles.css';
import Header from '../../components/header';



export default function Class() {
    const [turmas, setTurmas] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // buscar dados da API
        setTitle("Informática");
        setTurmas([
            {
                id: "ac246",
                nome: "1ª A", 
            },
            {
                id: "ac94654",
                nome: "2ª A", 
            },
            {
                id: "ab6461",
                nome: "3ª A", 
            },
            {
                id: "asd554",
                nome: "4ª A", 
            },
            {
                id: "asd418",
                nome: "1ª B", 
            }
            ,
            {
                id: "asda54",
                nome: "2ª C", 
            },
            {
                id: "845as1d6",
                nome: "4ª B", 
            },
            {
                id: "asd4a9sd",
                nome: "3ª B", 
            }
        ]);
    }, []);

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Selecione uma turma de {title}</h1>
                <ul  >
                    {turmas.map(turma => (
                        <li key={turma.id} style={{paddingLeft:5, paddingRight:5}}>  
                            <FaUserGraduate size={60} color='gray'  />
                            <span>{turma.nome}</span>
                            <div className="linkButtons">
                                <Link className="link linkButtonsItem" to={`/monitor/${turma.id}`}>Monitor</Link>
                                <Link className="link linkButtonsItem" to={`/monitor/${turma.id}`}>Diagnostico</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}