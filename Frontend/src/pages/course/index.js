import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';   
import {  FiMonitor, FiSettings, FiHome, FiGlobe, FiPieChart  } from 'react-icons/fi';


import './styles.css';
import Header from '../../components/header';



export default function Course() {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        // buscar dados da API 
        setCourse([
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
                <h1 className="titlePage">Selecione um Curso</h1>
                <ul  >
                    {course.map(course => (
                        <li key={course.id} >  
                            <course.icon size={60} color='gray'  />
                            <Link className="link" to={`/class/${course.id}`}>{course.nome}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}