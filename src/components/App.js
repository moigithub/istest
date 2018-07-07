import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AppLayout from './Layout'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import Protected from './Protected'

const NotFound = () => (
  <AppLayout>
    <div className="not-found">404 Not Found</div>
  </AppLayout>
)

const ProtectedRoutes = (props) => (
  <Protected {...props}>
    <Switch>
      <Route path={`${props.match.url}/dashboard`} component={Dashboard} />
    </Switch>
  </Protected>
)

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />

      <Route path="/app/" component={ProtectedRoutes} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
