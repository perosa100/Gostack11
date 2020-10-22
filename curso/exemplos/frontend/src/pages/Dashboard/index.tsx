import React, { FormEvent, useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import { Error, Form, Repositories, Title } from './styles'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}
const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    )

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    }

    return []
  })
  const [inputError, setInputError] = useState('')
  const [newRepo, setNewRepo] = useState('')

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])
  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite o author/nome do repositório')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (error) {
      setInputError('Erro na busca por esse repositório')
    }
  }
  return (
    <>
      <img src={logoImg} alt="logoImg" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} color="#000" />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
