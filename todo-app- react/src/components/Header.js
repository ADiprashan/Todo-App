import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";
import { withRouter } from "react-router-dom";
class Header extends Component {
  state = {};
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIN();

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
          <div>
            <span className="navbar-brand">Dev Dehi</span>
          </div>
          <ul className="navbar-nav">
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/welcome">
                  Home
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
