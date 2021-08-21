import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./chat.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chat from "./components/ChatComponents";
import Home from "./components/HomeComponents";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/chat/:user' component={Chat} />
    </Switch>
  </BrowserRouter>
);

export default App;
