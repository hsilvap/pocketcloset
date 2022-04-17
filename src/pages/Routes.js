import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants'
import { LoadUserInfo } from '../hooks/useDb'
import Landing from './Landing/Landing'
import Tops from './Tops/Tops'
import Upload from './Upload/Upload'

const PocketClosetRouter = () => {
  LoadUserInfo()
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.MY_CLOSET} element={<Landing />} />
        <Route path={ROUTES.TOPS} element={<Tops />} />
        <Route path={ROUTES.BOTTOMS} element={<Landing />} />
        <Route path={ROUTES.UPLOAD} element={<Upload />} />
        <Route path={ROUTES.COMPARE} element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PocketClosetRouter
