import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Knowledges from './pages/Knowledges';
import Parser from './pages/Parser';

function App () {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/parser">
            <Parser />
          </Route>
          <Route path="/">
            <Knowledges />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App