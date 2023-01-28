import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3000/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser} type="submit">
          Ajouter un utilisateur
        </button>
      </div>
    </div>
  );
}

export default App;
