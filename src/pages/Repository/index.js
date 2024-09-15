import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Owner, Loading, BackButton } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repository() {
    const { repository } = useParams();
    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            const repoName = decodeURIComponent(repository);

            try {
                const [repositoryData, issuesData] = await Promise.all([
                    api.get(`/repos/${repoName}`),
                    api.get(`/repos/${repoName}/issues`, {
                        params: {
                            state: 'open',
                            per_page: 5
                        }
                    })
                ]);

                setRepo(repositoryData.data);
                setIssues(issuesData.data);
            } catch (error) {
                console.error('Failed to load repository data:', error);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [repository]); 

    if (loading) {
        return (
            <Loading>
                Loading....
            </Loading>
        );
    }

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <FaArrowLeft color='#000' size={30} />
            </BackButton>

            <Owner>
                <img src={repo.owner?.avatar_url} alt={repo.owner?.login} />
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>
        </Container>
    );
}
