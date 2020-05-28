import React,{ useState } from 'react';  

import './styles.css';
 
export default function Panel()
{ 
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        // buscar dados da API
        setTurmas([
            {
                id: "ac246",
                nome: "Informática"
            },
            {
                id: "ac94654",
                nome: "Edidificações"
            },
            {
                id: "ab6461",
                nome: "Eletromecânia"
            }
        ]);
    }, []);

    return (
        <div>
            <h1>Panel</h1>
            <ul>
                {turmas.map(turma => (
                    <li key={turma.id} >
                        <Link to={`/monitor/${turma.id}`}>{turma.nome}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}