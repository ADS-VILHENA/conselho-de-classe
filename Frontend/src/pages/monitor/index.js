import React,{ useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {  FaArrowLeft } from 'react-icons/fa';

import './styles.css';
import Header from '../../components/header';

export default function Monitor()
{

    const history = useHistory();
 
    return(
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">
                    <span className="backButton" onClick={() => {history.goBack()}} ><FaArrowLeft size={30} color='black' /></span>
                    Monitorar turma
                </h1>
 
                <ul > 
                </ul>
            </section>
        </div>
    );
}