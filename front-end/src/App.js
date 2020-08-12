import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ui from "./components/ui.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/ui"]} component={ui} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
