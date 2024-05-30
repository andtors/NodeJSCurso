import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'

/*Pages*/ 
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'

function App() {

  return (

    <BrowserRouter>
    <Navbar />
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App
