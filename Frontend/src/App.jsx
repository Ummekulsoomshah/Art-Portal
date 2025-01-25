import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import { SocketProvider } from './context/SocketContext'
const App = () => {
  return (
    <SocketProvider>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createpost' element={<CreatePost />} />

        </Routes>
      </BrowserRouter>
    </SocketProvider>
  )
}

export default App
