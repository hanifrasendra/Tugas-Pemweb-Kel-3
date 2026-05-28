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


const layoutVar = ({ isLogin, setIsLogin, user, setUser }) => {
    return(
        <>
            <Navigator isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/>
        </>
    )
}



function App() {
  const [isLogin, setIsLogin] = useState(() => {
    const saved = localStorage.getItem("isLogin")
    return saved  ? JSON.parse(saved) : false
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )

  const navVar = {
    isLogin,
    setIsLogin,
    user,
    setUser
  }

  return (
    <BrowserRouter>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<><Navigator {...navVar}/><HalamanUtama /></>} />
          <Route path="/home" element={<><Navigator {...navVar}/><HalamanUtama /></>} />
          <Route path="/login" element={<><Navigator {...navVar}/><LoginPage isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} /></>} />
          <Route path="/register" element={<><Navigator {...navVar}/><RegisterPage /></>} />
          <Route path="/catalog" element={<><Navigator {...navVar}/><CatalogPage /></>} />
          <Route path="/tambah" element={<><Navigator {...navVar}/><TambahProposal isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/></>} />
          <Route path="/edit/:id" element={<><Navigator {...navVar}/><EditPage isLogin={isLogin} setIsLogin={setIsLogin}/></>} />
          <Route path="/explore" element={<><Navigator {...navVar}/><ExplorePage isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/></>} />
          <Route path="/post-proposal" element={<><Navigator {...navVar}/><PostProposalPage isLogin={isLogin} user={user} /></>} />
          <Route path="/admin" element={<><Navigator {...navVar}/><AdminPage /></>} />
          <Route path="/profil" element={<><Navigator {...navVar}/><UserProfilePage user={user} /></>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
