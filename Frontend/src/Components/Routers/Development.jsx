import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function Development() {
  return (
    <div>
      <Router>
          <Routes>
           {/* the main page development*/}
            <Route path='/' element={<HomePage />} />
            {/* rest pages attach to that     development/...    */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/teach' element={<Teach/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default Development
