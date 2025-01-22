import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import './Home.css'
import { Link, useSearchParams } from 'react-router-dom'
import TrendinSide from './TrendinSide'
import Notifications from './Notifications'
import axios from 'axios'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
const Home = () => {
  const [posts, setPosts] = useState([])
  const [activePostId, setActivePostId] = useState(null);
  // Tracks the active post for commenting
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await axios.get('http://localhost:3000/user/getPosts', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(resp.data.updatedPost)
      const posts = resp.data.updatedPost
      setPosts(posts)
      // console.log("posts",posts)

    }
    fetchPosts()
  }, [])
  const handleLike = async (postId) => {

    try {
      const resp = await axios.post(`http://localhost:3000/user/post/${postId}`, {},
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type
            "authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (resp.status === 200) {
        console.log(resp.data.notifications)
        socket.emit('likes', resp.data.notifications)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleComment = async (postId) => {
    if (activePostId === postId) {
      setActivePostId(null); // Close the form if the same post is clicked again
    } else {
      setActivePostId(postId);
      try {
        const resp = await axios.get(`http://localhost:3000/user/comment/${postId}`)
        if (resp.status === 200) {
          // console.log(resp.data.commentsData)
          const comments = resp.data.commentsData
          setComments(comments)
          // socket.emit('notification',comments)

        } else {
          console.log('error')
        }
      } catch (err) {
        console.log(err)
      }
    }

  }

  const submitComment = async (postId) => {
    // console.log(commentText)
    // console.log(postId)
    try {
      const resp = await axios.post(`http://localhost:3000/user/comment/${postId}`, {
        comment: commentText
      },
        {
          headers: {
            "Content-Type": "application/json", // Specify content type
            "authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(resp)
      redirect('/home')
    } catch (err) {
      console.log(err)
    }

  }
  console.log("activePostId", activePostId)

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

              <div class="flex gap-2 items-center p-1">
                <button onClick={() => handleLike(post.post_id)} class="flex items-center text-gray-600 hover:text-red-500 transition">
                  {post.post_likes} <span >  Like</span>
                </button>
                <button onClick={() => handleComment(post.post_id)} class="flex items-center text-gray-600 hover:text-green-500 transition">
                  💬 <span >Comment</span>
                </button>
                <button class="flex items-center text-gray-600 hover:text-blue-500 transition">
                  🔗 <span >Share</span>
                </button>
              </div>
              {activePostId === post.post_id && (
                <div class="w-100 ml-14 mt-4">
                  <div class="relative w-full min-w-[200px]">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "></textarea>
                    <label
                      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Message
                    </label>
                    <button class='rounded p-2 bg-gray-600' onClick={() => { submitComment(post.post_id) }}> add comment</button>
                  </div>
                  {comments.map((comment, index) => (

                    <div class="max-w-md mx-auto bg-dark shadow-lg rounded-lg p-6 mb-4">
                      <div class="flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="User Avatar"
                          class="w-10 h-10 rounded-full border-2 border-blue-500"
                        />
                        <div class="ml-3">
                          <h3 class="text-white font-semibold text-sm">{comment.comment_author}</h3>
                          <p class="text-xs text-gray-500">{comment.comment_created_at}</p>
                        </div>
                      </div>
                      <p class="mt-4 text-white text-sm">
                        {comment.comment}
                      </p>
                      <div class="mt-4 flex items-center space-x-3">
                        <button
                          class="flex items-center text-blue-500 text-sm font-medium hover:text-blue-700 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 9l-5 5m0 0l-5-5m5 5V3" />
                          </svg>
                          Reply
                        </button>
                        <button
                          class="flex items-center text-gray-500 text-sm font-medium hover:text-gray-700 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 15l7-7 7 7" />
                          </svg>
                          Like
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

          ))}
        </div>

      </div>
      <Notifications />
    </div>
  )
}

export default Home
