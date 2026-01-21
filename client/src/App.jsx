import React from 'react'
// In react-router-dom, the <Routes> component acts as a container for all route definitions, while the <Route> component defines a specific mapping between a URL path and the component (or "element") that should be rendered when that path matches. 
import { Routes, Route } from 'react-router-dom'

// Importing the pages we created in the /pages directory for setting up the routes.
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'

const App = () => {
  return (
      <div>
          {/* This is the main container for all the routes. */}
          <Routes>
              {/* Setting up individual routes for the pages. */}
              <Route path='/' element={<Home />} />

              {/* <Route path='(website URL, e.g. domain.com/result)' element={<Component />}/> is the syntax for setting up a route. */}
              <Route path='/result' element={<Result />} />
              <Route path='/buy' element={<BuyCredit />} />
          </Routes>
    </div>
  )
}

export default App