import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import NotFound from '../layout/NotFound';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        {/* <PrivateRoute exact path="/posts/:id" component={Post} /> */}
        {/* <Route component={NotFound} /> */}
        {/* <Route exact path="/profiles" component={Profiles} /> */}
        {/* <PrivateRoute exact path="/posts" component={Posts} /> */}
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
      </Switch>
    </section>
  );
};

export default Routes;