import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/*Pages*/
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'

/* Context */
import { UserProvider } from './context/UserContext'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

function App() {

  return (

    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet/>} />
            <Route path="/pet/edit/:id" element={<EditPet/>} />
            <Route path="/pet/:id" element={<PetDetails/>} />
            <Route path="/pet/myadoptions" element={<MyAdoptions/>} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
