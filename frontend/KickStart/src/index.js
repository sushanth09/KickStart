import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import StartUpIdea from './views/StartupIdea.js'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/" exact component={Landing} />
      <Route path="/startUpIdea" exact component={StartUpIdea} />
      <Route path="/profile" exact component={Profile} />
      
      <Redirect from="*" to="/" />
      
      
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      {/* add routes without layouts */}
      <Route path="/index" exact component={Index} />
      {/* add redirect for first page */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
