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
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "false"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )

  return (
    <BrowserRouter>
        <Navigator isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<HalamanUtama />} />
          <Route path="/home" element={<HalamanUtama />} />
          <Route path="/login" element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/tambah" element={<TambahProposal isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/>} />
          <Route path="/edit/:id" element={<EditPage isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
