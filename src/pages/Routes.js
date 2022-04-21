import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants'
import { UseStoreContext } from '../context/store'
import { LoadUserInfo } from '../hooks/useDb'
import Bottoms from './Bottoms/Bottoms'
import Compare from './Compare/Compare'
import Landing from './Landing/Landing'
import Tops from './Tops/Tops'
import Upload from './Upload/Upload'

const PocketClosetRouter = () => {
  LoadUserInfo()
  const { state } = UseStoreContext()
  const isAllowed = state.loggedIn

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route
          path={ROUTES.MY_CLOSET}
          element={isAllowed ? <Landing /> : <Navigate replace to='/' />}
        />
        <Route
          path={ROUTES.TOPS}
          element={isAllowed ? <Tops /> : <Navigate replace to='/' />}
        />
        <Route
          path={ROUTES.BOTTOMS}
          element={isAllowed ? <Bottoms /> : <Navigate replace to='/' />}
        />
        <Route
          path={ROUTES.UPLOAD}
          element={isAllowed ? <Upload /> : <Navigate replace to='/' />}
        />
        <Route
          path={ROUTES.COMPARE}
          element={isAllowed ? <Compare /> : <Navigate replace to='/' />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default PocketClosetRouter
