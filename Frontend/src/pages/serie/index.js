import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';   
import { FaUserGraduate } from 'react-icons/fa';


import './styles.css';
import '../../global.css'
import Header from '../../components/header';
import api  from '../../services/api'


export default function Serie() {
    const [serie, setSerie] = useState([]);
    const [title, setTitle] = useState('');
    const {id} = useParams();

    useEffect(() =>{
        getSerie()
    },[])

    async function getSerie(){
        await api.get(`/serie/${id}`).then(reponse =>{
            setSerie(reponse.data)
        }).catch(err =>{
            alert(err)
        })
    }
    useEffect(() => {
        // buscar dados da API
        setTitle("Informática");
        getSerie()
    }, []);

    return (
        <div className="main-container">
            <Header />

            <section>
                <h1 className="titlePage">Selecione uma serie de {title}</h1>
                <ul  >
                    {serie.map(serie => (
                        <li key={serie.id} style={{paddingLeft:5, paddingRight:5}}>  
                            <FaUserGraduate size={60} color='gray'  />
                            <span>{serie.nome}</span>
                            <div className="linkButtons">
                                <Link className="link linkButtonsItem" to={`/monitor/${serie.id}`}>Monitorar</Link>
                                <Link className="link linkButtonsItem" to={`/diagnostic/${serie.id}`}>Diagnosticar</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}