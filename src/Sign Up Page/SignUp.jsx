import { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([])
  const [userMsg, setUserMsg] = useState("")
  const [passwordMsg, setPasswordMsg] = useState("")
  const [emailMsg, setEmailMsg] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const signUp = { username, email, password, passwordConfirmation };
    try {
      console.log('try')
      const response = await fetch("http://localhost:3000/api/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUp),
      });
      if (!response.ok) {
        console.log('not ok')
        const json = await response.json();
        resetErrors()
        setErrors(json)
        addErrorMsgs()
        throw new Error(`Error ${response.status}`);
      } else {
        const json = await response.json()
        console.log(json)
        // console.log(signUp);
        console.log("user added successfully");
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  function resetErrors(){
    setUserMsg("")
    setPasswordMsg("")
    setEmailMsg("")
  }

  function addErrorMsgs(){
    errors.errors.forEach(error => {
        if(error.path === 'username'){
        setUserMsg(error.msg)
        console.log(userMsg)
      }
      if(error.path === 'passwordConfirmation'){
        setPasswordMsg(error.msg)
        console.log(passwordMsg)
      }
      if(error.path === 'email'){
        setEmailMsg(error.msg)
        console.log(emailMsg)
      }
    });
  }

  return (
    <div className="container">
      <h1> Sign Up </h1>
      <form onSubmit={handleSubmit}>

        <p>{userMsg}</p>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>{emailMsg}</p>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <p>{passwordMsg}</p>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
