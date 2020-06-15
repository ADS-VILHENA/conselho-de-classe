import React,{ useState } from 'react';  
import {  FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Header from '../../components/header';

export default function Diagnostic()
{ 
    const history = useHistory();

    return(
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">
                    <span className="backButton" onClick={() => {history.goBack()}} ><FaArrowLeft size={30} color='black' /></span>
                    Diagnosticar turma
                </h1> 
                <ul > 
                </ul>
            </section>
        </div>
    );
}

