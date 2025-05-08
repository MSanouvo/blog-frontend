import './NavBar.css'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

NavBar.propTypes = {
  header: PropTypes.string,
  button: PropTypes. bool
}

const NavBar = ({ header, button }) => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const json = await response.json();
        // console.log(json);
        setUser(json.user)
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="nav">
      <h2>{header}</h2>
      <p>Hello, {user.username}</p>
      {!button === false && <button>Log Out</button>}
    </div>
  );
};

export default NavBar;
