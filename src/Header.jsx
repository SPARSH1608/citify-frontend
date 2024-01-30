import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://citify.onrender.com/profile', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userInfo = await response.json();
        console.log(userInfo);
        setUserInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  const logout = () => {
    fetch('https://citify.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  };
  const username = userInfo?.username;
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          Citify
        </Link>
        <nav>
          {username ? (
            <>
              <Link to="/create">Create New Post</Link>
              {/* <Link to="/logout">Logout</Link> */}
              <a onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
