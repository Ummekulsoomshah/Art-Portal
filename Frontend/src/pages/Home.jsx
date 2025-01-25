import React, { useEffect, useState } from 'react'
import { redirect, useMatch, useNavigate } from 'react-router-dom'
import './Home.css'
import { Link, useSearchParams } from 'react-router-dom'
import TrendinSide from './TrendinSide'
import Notifications from './Notifications'
import axios from 'axios'
import CardLike from './CardLike'
const Home = () => {
  const [posts, setPosts] = useState([])
 


  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await axios.get('http://localhost:3000/user/getPosts', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const posts = resp.data.updatedPost
      setPosts(posts)

    }
    fetchPosts()

  }, [])
  return (
    <div className='dark flex h-screen'>
      <TrendinSide />
      <div className="ml-72 w-1/2 pl-20 pr-20 p-6 h-screen">
        <div class='flex justify-around'>

          <h2 className="text-2xl font-bold text-white mb-6">Latest Art Posts</h2>

          <Link to='/createpost'>

            <h2 className="text-2xl px-3 pl-1 border border-gray rounded-lg-50% font-bold text-white mb-6">Create post</h2>
          </Link>
        </div>
        <div className="grid w-full pl-3 pr-3  grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {posts.map((post, index) => (

            <div
              className="text-white rounded-lg border-t-4 border-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
            >
              {/* Author Section */}
              <div className="flex items-center mb-4">
                <img
                  src={post.post_image}
                  alt="Author"
                  className="w-12 h-12 rounded-full border-2 border-gray-700"
                />
                <div className="ml-3">
                  <h4 className="text-md font-semibold">{post.username}</h4>
                  <p className="text-gray-400 text-xs">{post.post_created_at}</p>
                </div>
              </div>
              <div class='mb-6'>
                <p className="text-white text-bold text-sm">
                  {post.post_description}<a href="#" className="text-blue-400 hover:underline">Read more</a>
                </p>
              </div>
              {/* Post Image */}
              <img
                src={post.post_image}
                alt="Post"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardLike post={post} />

            </div>

          ))}
        </div>

      </div>
      <Notifications />
    </div>
  )
}

export default Home
