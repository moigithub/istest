import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AppLayout from './Layout'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import Protected from './Protected'

import EditUser from './EditUser'
import NewUser from './NewUser'

const NotFound = () => (
  <AppLayout>
    <div className="not-found">404 Not Found</div>
  </AppLayout>
);


const ProtectedRoutes = (props) => (
  <Protected {...props}>
    <Switch>
      <Route path={`${props.match.url}/dashboard`} component={Dashboard} />
      <Route path={`${props.match.url}/user/new`} component={NewUser} />
      <Route path={`${props.match.url}/user/:id/edit`} component={EditUser} />
      <Route component={NotFound} />
    </Switch>
  </Protected>
);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />

    <Route path="/app/" component={ProtectedRoutes} />
    <Route component={NotFound} />
  </Switch>
);

export default App
