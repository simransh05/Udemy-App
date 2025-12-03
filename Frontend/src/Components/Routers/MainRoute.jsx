import React from 'react'
import Development from './Development'
import Business from './Business'
import Design from './Design'
import Health from './Health'


function MainRoute() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/development/*' element={<Development />} />
                    <Route path='/business/*' element={<Business />} />
                    <Route path='/design/*' element={<Design />} />
                    <Route path='/health/*' element={<Health />} />
                </Routes>
            </Router>
        </div>
    )
}

export default MainRoute
