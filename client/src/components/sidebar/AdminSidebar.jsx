import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useSignOut } from "react-auth-kit";
import { useContext, useState, useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import GirlIcon from "@mui/icons-material/Girl";
import ChurchIcon from "@mui/icons-material/Church";
import { useAuthUser } from "react-auth-kit";

const AdminSidebar = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const { dispatch } = useContext(DarkModeContext);
  const [isAdmin, setIsAdmin] = useState();
  const handleLogout = () => {
    signOut();
  };
  useEffect(() => {
    if (auth().access_level == "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  });
  return (
    <div className="sidebar">
      <div className="top">
        <div style={{ textDecoration: "none" }}>
          <span className="logo">Admin Portal</span>
        </div>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          {isAdmin && (
            <Link to="/user" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
          )}
          {isAdmin && (
            <Link to="/church" style={{ textDecoration: "none" }}>
              <li>
                <ChurchIcon className="icon" />
                <span>Churches</span>
              </li>
            </Link>
          )}
          {isAdmin && (
            <Link to="/christian" style={{ textDecoration: "none" }}>
              <li>
                <GirlIcon className="icon" />
                <span>Christian</span>
              </li>
            </Link>
          )}
          {!isAdmin && (
            <Link to="/christians" style={{ textDecoration: "none" }}>
              <li>
                <GirlIcon className="icon" />
                <span>Christians</span>
              </li>
            </Link>
          )}
          <Link
            to="/"
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default AdminSidebar;
