import React from 'react';

import './styles.css';
import Header from '../../components/header';

export default function Panel() {

    return (
        <div className="main-container">
            <Header />
            <section>
                <h1 className="titlePage">Painel</h1>
                <ul  >
                </ul>
            </section>
        </div>
    );
}