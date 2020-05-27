import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';  

import './styles.css';
import setaDImg from '../../assets/setaD.png';
import setaEImg from '../../assets/setaE.png';
 
export default function Monitor()
{ 
    
    const history = useHistory();

    async function proxAluno(e) {
        e.preventDefault();

        try {
            history.push('/monitor');
        } catch (err) {
            alert(err)
        }
    }
    async function antAluno(e) {
        e.preventDefault();

        try {
            history.push('/monitor');
        } catch (err) {
            alert(err)
        }
    }
    return(
        <div>
            <h1>Monitoria </h1>
        <div>
            <nav>
                <ul class="paginacao">
                    <li class="paginacao"><button type="submit"><img className="seta" src={setaDImg}></img></button></li>
                    <li class="page-item"><button type="submit"><img className="seta" src={setaEImg}></img></button></li>
                </ul>
            </nav>
        </div>
            
        </div>
    );
}