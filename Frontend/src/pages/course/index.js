import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import Header from '../../components/header';

import { Spinner } from 'react-bootstrap';

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

            <div className="main-content">

                <section>
                    <h1 className="titlePage">Selecione um Curso</h1>
                    {
                        loading ?
                            <div className="selfCenter" >
                                <Spinner animation="border" variant="success" />
                            </div>
                            :
                            <ul className="mainUlContainer">
                                {course.map(course => ( 
                                        <Link  className="cardCourse" key={course.id.toString()} to={`/serie/${course.id}`}>
                                            <div className="linkContent">
                                                <div className="nivelTitle">
                                                    <span>{course.nivel}</span>
                                                </div> 
                                                <span>{course.nome}</span>
                                            </div>
                                        </Link> 

                                ))}
                            </ul>
                    }
                </section>
            </div>
        </div>
    );
}