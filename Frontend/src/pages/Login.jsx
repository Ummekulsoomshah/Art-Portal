import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import img from '../assets/ellipse-6512782_1280.jpg'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { useState } from 'react'
import { useSocket } from '../context/SocketContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userId,setUserId]=useState('')
  const socket=useSocket()
  const navigate=useNavigate()

  useEffect(() => {
    if (socket && userId) {
        socket.emit('newUser', userId);
    }
}, [socket, userId]);
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(email, password)
    const data = {
      email,
      password
    }
    try {
      const res = await axios.post('http://localhost:3000/user/login', data,
      )
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        setUserId(res.data.id)
        navigate('/home')

        console.log('User found Successfully')
      } else {
        console.log('Error')
      }

    } catch (err) {
      console.log(err)

    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className="bg-cover bg-center h-screen" 
         style={{ backgroundImage: `url(${img})` }}>
        <div className='flex justify-center items-center h-full'>
            <div className='p-7 w-1/2 flex flex-col justify-between bg-white bg-opacity-90 rounded-lg' style={{ height: 'auto', maxHeight: '80vh' }}>
                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-xl mb-2'>Enter your email address</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded mt-2 mb-5 px-10 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='user@gmail.com'
                        type="email" />
                    <h3>Enter your password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='user123@' type="text" />
                    <button
                        className='mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg'
                    >Sign in</button>
                    <p>Already have an Account?<Link to='/' className='text-blue-600'>Sign in here</Link></p>
                </form>
            </div>
        </div>
    </div>
);
}

export default Login
