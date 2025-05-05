import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  // const [pending, togglePending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    const login = { username, password };

    try{
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      })
      if (!response.ok) {
        setErrorMsg('Invalid login credentials')
        throw new Error(`Error ${response.status}`);
      }
      setErrorMsg("")
      //Make it so if token is expired, we get redirected to login
      const json = await response.json()
      localStorage.setItem('jwt', json.token)
      const token = localStorage.getItem('jwt')
      console.log(token)
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h1> Login </h1>

      {errorMsg}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Prob not applicable for the login */}
        {/* { !pending && <button>Login</button> }
        { pending && <button disabled>Logging in</button> } */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
