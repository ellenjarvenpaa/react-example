/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
  const {user} = useUserContext();

  return (
  <>
    <h2>Profile page</h2>
    {user &&
    <>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
    <p>Created: {new Date (user.created_at).toLocaleString('fi-FI')}</p>
    <p>
      <Link to="/logout">Logout</Link>
    </p>
    <p>
      <Link to="/upload">Upload</Link>
    </p>
    </>
    }
  </>
  )
};

export default Profile;
