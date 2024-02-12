import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {

  const {user, handleAutoLogin} = useUserContext();

  if(!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header>
            <p>
              <Link className="home" to="/login">Login</Link>
            </p>
            <h1 className="title">
              <Link to="/">Rate <br /> My <br /> OOTD</Link>
            </h1>
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
