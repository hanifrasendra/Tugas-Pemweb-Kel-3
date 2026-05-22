import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HalamanUtama from "./pages/HalamanUtama.jsx"
import Navigator from "./component/Navigator.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import CatalogPage from "./pages/CatalogPage.jsx"
import TambahProposal from './pages/TambahProposal.jsx'
import EditPage from './pages/EditPage.jsx'
// ── New CompeteHub Pages ──────────────────────────────────
import ExplorePage from './pages/ExplorePage.jsx'
import PostProposalPage from './pages/PostProposalPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'

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
          {/* Existing Routes */}
          <Route path="/" element={<HalamanUtama />} />
          <Route path="/home" element={<HalamanUtama />} />
          <Route path="/login" element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/tambah" element={<TambahProposal isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/>} />
          <Route path="/edit/:id" element={<EditPage isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          {/* ── New CompeteHub Interfaces ─────────────────── */}
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/post-proposal" element={<PostProposalPage isLogin={isLogin} user={user} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profil" element={<UserProfilePage user={user} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
