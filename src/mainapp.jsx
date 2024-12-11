import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Landing'
import App from './App'
import { UploadFile } from '@mui/icons-material'
const Mainapp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<App />} />

    </Routes>
  )
}

export default Mainapp