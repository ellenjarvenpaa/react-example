import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {

  const {user, handleAutoLogin} = useUserContext();

  if(!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header className="flex justify-end bg-red-300">
            <p>
              <Link className="hover:scale-125 block text-center text-slate-50" to="/login">Login</Link>
            </p>
            <h1 className="block">
              <Link to="/">Rate <br /> My <br /> OOTD</Link>
            </h1>
            <p>
              <Link className="block" to="/profile">Profile</Link>
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
