import {Link, Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
            <p>
              <Link className="home" to="/">Search</Link>
            </p>
        <h1 className="title">Rate <br /> My <br /> Outfit</h1>
            <p>
              <Link className="profile" to="/profile">Profile</Link>
            </p>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright 2024 - EJ</p>
      </footer>
    </>
  );
};

export default Layout;
