import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Hello from './components/templates/Hello'
import Login from './components/organisms/Login'

const Routes = () => {
  return (
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/hello" component={Hello} />
      <Route exact={true} path="/" render={() => <Redirect to="/hello" />} />
      <Route path="*" render={() => <Redirect to="/hello" />} />
    </Switch>
  )
}

export default Routes
