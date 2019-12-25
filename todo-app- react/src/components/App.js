import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "../AuthenticatedRoute";

import Login from "./Login";
import Lgout from "./Logout";
import Welcome from "./Welcome";
import TodoList from "./TodosList";
import Todo from "./Todo";

import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";

import "./app.css";
import "../bootstrap.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Lgout} />
          <AuthenticatedRoute path="/welcome" component={Welcome} />
          <AuthenticatedRoute path="/todos/:id" component={Todo} />
          <AuthenticatedRoute path="/todos" component={TodoList} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
