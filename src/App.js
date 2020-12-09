import React from "react";
import api from "./services/api";

import Header from "./components/Header";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get("/repositories").then((response) => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo Projeto ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["ReactJS", "RN", "NodeJS"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <Header title="My Repositories" />
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {" "}
            {repository.title} <br />
            <ul>
              <li>{repository.url}</li>
              {repository.techs.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
