import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HalamanUtama from "./pages/HalamanUtama.jsx"
import Navigator from "./component/Navigator.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import CatalogPage from "./pages/CatalogPage.jsx"
import TambahProposal from './pages/TambahProposal.jsx'
import EditPage from './pages/EditPage.jsx'

function App() {

  return (
    <BrowserRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<HalamanUtama />} />
          <Route path="/home" element={<HalamanUtama />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/tambah" element={<TambahProposal />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
