import React,{ useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import './styles.css';
import setaDImg from '../../assets/setaD.png';
import setaEImg from '../../assets/setaE.png';
import alunoImg from '../../assets/aluno.png';
export default function Monitor()
{
    let {id} = useParams();
 
    return(
        <div>
            <h1>Monitoria </h1> 
            <h2>{id}</h2>
        </div>
    );
}