// Modules
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Etc
import "./App.css";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

import { loadUser } from "./redux/modules/auth";
// Redux
import createStore from "./redux";
const store = createStore();

// Helper funcs
// import setAuthToken from "./utils/setAuthToken";

// Action creators

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  // React Hook
  useEffect(() => {
    // Attenmpt to assign token to axios global header
    // in case token is allready in local storage
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/Login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

