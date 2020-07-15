import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Knowledges from './pages/Knowledges';
import Knowledge from './pages/Knowledge';
import Parser from './pages/Parser';
import './tailwind.output.css';
import './App.css'

function App () {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/knowledges/:id">
            <Knowledge />
          </Route>
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