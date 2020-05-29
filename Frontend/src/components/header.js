import React, { useState, useEffect } from 'react';

import logoImg from '../assets/logo.png';

export default function Header() {
    return (
        <header>
            <img src={logoImg} alt="Logo Be The Hero" />
            <span>Bem vindo, Administrador</span>
        </header>
    );
}