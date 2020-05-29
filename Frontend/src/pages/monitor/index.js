import React,{ useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import './styles.css';
import Header from '../../components/header';

export default function Monitor()
{
    
 
    return(
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Monitor - Selecione um Turma</h1>
                <ul > 
                </ul>
            </section>
        </div>
    );
}