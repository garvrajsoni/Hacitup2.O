import { Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import Admin from './pages/Admin/Admin'
import HomeMain from './pages/Home/HomeMain'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeMain/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
    </Routes>
  )
}

export default App