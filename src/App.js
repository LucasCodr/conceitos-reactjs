import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([])

  useEffect(() => {

    api.get('/repositories').then(response => {

      setRepos([...repos, ...response.data])

    })

  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      "title": `Qualquer coisa ${Date.now()}`,
      "url": "https://github.com/LucasCodr",
      "techs": ["JS", "TS"]
    })

    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`)

    const arr = [...repos]

    const index = arr.findIndex(el => el.id === id);

    arr.splice(index, 1)

    setRepos(arr)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo => {

            return (
              <li key={repo.id}>
                {repo.title}

                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
