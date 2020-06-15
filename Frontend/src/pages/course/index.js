import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor, FiSettings, FiHome, FiGlobe, FiPieChart } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import Header from '../../components/header';



export default function Course() {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        // buscar dados da API 

        getCourses();

    }, []);

    async function getCourses() {
        await api.get('/curso').then(response => {
            setCourse(response.data);
        }).catch(err => {
            console.error(err)
            alert(err);
        });
    }

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Selecione um Curso</h1>
                <ul  >
                    {course.map(course => (
                        <Link key={course.id.toString()} className="card" to={`/serie/${course.id}`}>
                            <li > 
                                <span>{course.nivel}</span> 
                                <span>{course.nome}</span> 
                            </li>
                        </Link> 
                    ))}
                </ul>
            </section>
        </div>
    );
}