import { useState } from 'react';

const RegisterPage = () => {
  const url = 'https://citify.onrender.com';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(e) {
    e.preventDefault();

    const response = await fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // .then(() => alert('Registeraton Successful'))
    // .catch((error) => {
    //   alert('registeration failed' + error.message);
    // });
    console.log(response);
    if (response.status === 200) {
      alert('Registeraton Successful');
    } else {
      alert('Registeration Failed');
    }
  }

  return (
    <div>
      <form action="/register" className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
