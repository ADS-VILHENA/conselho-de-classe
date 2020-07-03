import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor, FiSettings, FiHome, FiGlobe, FiPieChart } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import Header from '../../components/header';

import { Spinner, Badge } from 'react-bootstrap';

export default function Course() {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // buscar dados da API 

        getCourses();

    }, []);

    async function getCourses() {
        setLoading(true); 

        await api.get('/curso').then(response => {
            setCourse(response.data);
        }).catch(err => {
            console.error(err)
            alert(err);
        });

        setLoading(false);
    }

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Selecione um Curso</h1>
                {
                    loading ? 
                        <div className="selfCenter" >
                            <Spinner animation="border" variant="success" />
                        </div>
                        
                        :
                        <ul  >
                            {course.map(course => (
                                <Link key={course.id.toString()} className="card link" to={`/serie/${course.id}`}>
                                    <li>
                                        <Badge className="courseNivel" variant="success">{course.nivel}</Badge> 
                                        <span>{course.nome}</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                }


            </section>
        </div>
    );
}