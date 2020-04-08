import React,  {useState}  from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [indicentId, setIndicentId] = useState('');

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    async function handleRegisterNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('/incidents', data, {
                    headers:{
                        Authorization: ongId,
                    }
                    
                }).then( response => {
                    setIndicentId(response.data.id);
                });
    

            alert(`Incidente incluído com sucesso: ${indicentId}`);

            history.push('/profile');
        }catch(err){
            alert('Ocorreu um erro ao incluir incidente.');
        }
    
    }

    function handleProfile(){        
        
        history.push('/profile');

    }
    return (

        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>

                <h1>Cadastrar Novo Caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isto</p>

                <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para home
                </Link>

            </section>

            
            <form onSubmit={handleRegisterNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}    
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}    
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}       
                        onChange={e=> setValue(e.target.value)}    
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>

        </div>
    </div>
    );
}