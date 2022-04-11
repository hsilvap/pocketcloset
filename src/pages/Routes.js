import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants'
import Landing from './Landing/Landing'
import Upload from './Upload/Upload'

const PocketClosetRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.MY_CLOSET} element={<Landing />} />
        <Route path={ROUTES.TOPS} element={<Landing />} />
        <Route path={ROUTES.BOTTOMS} element={<Landing />} />
        <Route path={ROUTES.UPLOAD} element={<Upload />} />
        <Route path={ROUTES.COMPARE} element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PocketClosetRouter
