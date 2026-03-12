import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HalamanUtama from "./pages/HalamanUtama.jsx"
import Navigator from "./component/Navigator.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navigator/>
      <ProfilePage/>
    </div>
    
  )
}

export default App
