import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    
    function handleInputChange(e){
        setNewRepo(e.target.value);
    }

    
    const handleSubmit = useCallback(() => {
        e.preventDefault();

        async function submit(){
            const response = await api.get(`repos/${newRepo}`);

            const data = {
                name: response.data.full_name,
            }
    
            setRepositorios([...repositorios, data]);
            setNewRepo('');
        }

        submit();
    }, [newRepo, repositorios]);

    return(
      <Container>
        
        <h1>        
            <FaGithub size={25} />
            My Repositories
        </h1>
        
        <Form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder='Add Repositories'
                value={newRepo}
                onChange={handleInputChange}    
            />
            <SubmitButton>
            <FaPlus color='#fff' size={14}/>

            </SubmitButton>
        </Form>

      </Container>  
    );
}
