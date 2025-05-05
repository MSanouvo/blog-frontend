import './NavBar.css'

const NavBar = ({ header, button }) => {
  return (
    <div className="nav">
      <h2>{header}</h2>
      {!button === false && <button>Log Out</button>}
    </div>
  );
};

export default NavBar;
