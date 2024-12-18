import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar({ crrUser, remove }) {
  const navigate = useNavigate();

  function logOut() {
    let useChoice = window.confirm("Are You Sure to logout?");
    if (useChoice) {
      remove();
      navigate("/login");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link id="logo" className="navbar-brand" to={"/home"}>
            EgyBest
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {crrUser ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/movies"
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/tv"
                  >
                    Tv
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/people"
                  >
                    People
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item ">
                <i className="fa-brands me-3  fa-facebook-f"></i>
                <i className="fa-brands me-3   fa-instagram"></i>
                <i className="fa-brands me-3  fa-twitter"></i>
                <i className="fa-brands me-3  fa-linkedin"></i>
              </li>

              {crrUser ? (
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logOut}>
                    {" "}
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                       className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to={"/register"}
                    >
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                       className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
