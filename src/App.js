import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Link to="/pizza">Create Pizza</Link>
        </Route>
        <Route exact path="/pizza">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
