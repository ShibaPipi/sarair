import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { LearnRef } from '../feature/LearnRef'

import { TreeDateRenderer } from '../feature/TreeDataRenderer'

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/tree" element={<TreeDateRenderer />} />
                <Route path="/learn_ref" element={<LearnRef />} />
                <Route path="*" element={<div>Hello World</div>} />
            </Routes>
        </Router>
    )
}

export default App
