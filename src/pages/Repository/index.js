import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repository() {
  const navigate = useNavigate();
    const { repository } = useParams();
    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
      {state: 'all', label: 'All', active: true},
      {state: 'open', label: 'Open', active: false},
      {state: 'closed', label: 'Closed', active: false},
    ]);
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(() => {
        async function load() {
            const repoName = decodeURIComponent(repository);

            try {
                const [repositoryData, issuesData] = await Promise.all([
                    api.get(`/repos/${repoName}`),
                    api.get(`/repos/${repoName}/issues`, {
                        params: {
                            state: filters.find(f => f.active).state,
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

    useEffect(() => {
      async function loadIssue(){
        const repoName = decodeURIComponent(repository);

        const response = await api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filters[filterIndex].state,
            page,
            per_page: 5,
          }
        });

        setIssues(response.data);
      }

      loadIssue();
    }, [filterIndex, filters, page]);

    function handlePage(action){
      setPage(action === 'back' ? page - 1 : page + 1);
    }

    function handleFilter(index){
      setFilterIndex(index);
    }

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

            <FilterList active={filterIndex}>
              {filters.map((filter, index) => (
                <button 
                type='button' 
                key={filter.label} 
                onClick={() => handleFilter(index)}
                >
                  {filter.label}
                </button>
              ))}
            </FilterList>

            <IssuesList>
              {issues.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssuesList>

            <PageActions>
              <button 
              type='button' 
              onClick={() => handlePage('back')}
              disabled={page < 2}
              >Back
              </button>
              <button 
              type='button' 
              onClick={() => handlePage('next')}
              >Next
              </button>
            </PageActions>
        </Container>
    );
}
