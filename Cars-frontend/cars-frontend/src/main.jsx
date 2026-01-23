import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <StrictMode>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <App />
      </main>
      <Footer />
    </div>
  </StrictMode>
  </BrowserRouter>
);
