import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HalamanUtama from "./pages/HalamanUtama.jsx"
import Navigator from "./component/Navigator.jsx"
import LoginPage from "./pages/LoginPage.jsx"


function App() {

  return (
    <BrowserRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<HalamanUtama />} />
          <Route path="/home" element={<HalamanUtama />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
