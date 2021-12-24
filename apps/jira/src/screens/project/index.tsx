import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import { BoardScreen } from '../board'
import { EpicScreen } from '../epic'

export const ProjectScreen: React.FC = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to="board">看板</Link>
            <Link to="epic">任务组</Link>
            <Routes>
                <Route path="/board" element={<BoardScreen />} />
                <Route path="/epic" element={<EpicScreen />} />
                <Route path="*" element={<BoardScreen />} />
            </Routes>
        </div>
    )
}
