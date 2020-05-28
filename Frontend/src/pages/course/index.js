import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Course() {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        // buscar dados da API
        setCursos([
            {
                id: "ac246",
                nome: "1º Anos"
            },
            {
                id: "ac94654",
                nome: "2º Anos"
            },
            {
                id: "ab6461",
                nome: "3º Anos"
            }
        ]);
    }, []);

    return (
        <div>
            <h1>Curso</h1>
            <ul>
                {cursos.map(curso => (
                    <li key={curso.id} >
                        <Link to={`/monitor/${curso.id}`}>{curso.nome}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}