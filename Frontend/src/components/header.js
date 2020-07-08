import React  from 'react';

import logoImg from '../assets/logo.png';
import './header.css'

export default function Header() {
    return (
        <header >
            <div className="headerContent">
                <img className="logoHeader" src={logoImg} alt="Logo Be The Hero" />
                <span classNa="welcomeUser">Bem vindo, Administrador</span>
            </div>
        </header>
    );
}