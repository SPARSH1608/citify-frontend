import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
const url = 'https://citify.onrender.com';
export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${url}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        C i t i f y
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
