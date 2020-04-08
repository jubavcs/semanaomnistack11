import React, { useEffect, useState } from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Profile(){

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    // uma função que irá ser exeutada. Caso haja parametro dentro do array, indica que sempre que ele mudar a função vai ser executada.
    useEffect(() => {
        api.get('/profile', {
             headers:{
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data);
        });
    }, [ongId]);


    async function handleDeleteIncident(id){
        try
        {
            await api.delete(`/incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });

            const incidentesNovos = incidents.filter(incident => incident.id !== id);
            setIncidents({incidentesNovos});

        }
        catch(err)
        {
            alert('Erro ao excluir incidente!');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }



    return ( 
        <div className="profile-container">

            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda, {ongName}</span>

                <Link className="button" to="/indicents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="e02041"/>
                </button>
            
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {

                    incidents.map(incident => (

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
    
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
    
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
    
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
    
                        </button>
                    </li>

                    ))}
            </ul>
        </div>
    );
}