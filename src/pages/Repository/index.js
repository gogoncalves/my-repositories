import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repository() {
    const { repository } = useParams();

    return (
        <h1 style={{ color: '#FFF' }}>
            {decodeURIComponent(repository)}
        </h1>  
    );
}
