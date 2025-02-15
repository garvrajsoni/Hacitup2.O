import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import App from './App.jsx'
import Admin from './components/Admin.jsx'
import RegisterForm from './components/RegisterForm.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route index element={<App />}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
)
