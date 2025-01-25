import React, { useEffect } from 'react'
import img from '../assets/ellipse-6512782_1280.jpg'
import { useState } from 'react'
import axios from 'axios'

const TrendinSide = () => {
  const [trendingPosts, setTrendingPosts] = useState([])
  const truncateDescription=(description)=>{
    if(description.length>10){
        return description.substring(0,10)+'...';
    }else{
        return description;
    }
}
  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user/trendingPosts')
        if(res.status===200){
          setTrendingPosts(res.data.trendingPostsData)
        }else{
          console.log('Error')

        }
      } catch (error) {
        console.log(error)
      }
    }
    getTrendingPosts()
  },[])
  return (
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-1/4 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <h1 className="text-3xl font-bold  mb-5 text-white flex-1 ms-3 whitespace-nowrap">Trending now</h1>
        <ul class="space-y-2 font-medium">
          <li>

            <form class="max-w-md mx-auto">
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>

          </li>

 {trendingPosts.map((trendingPost)=>( 
          <li
              key={trendingPost.id}
              className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                className="w-12 h-12 rounded-full border-2 border-gray-300"
                src={trendingPost.image}
                alt={trendingPost.author}
              />
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {trendingPost.author}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {truncateDescription(trendingPost.description)}
                </p>
              </div>
              <button
                className="ml-4 px-4 py-2 text-white text-bold rounded-lg "
              >
                . . .
              </button>
            </li>
))} 
        </ul>
      </div>
    </aside>
  )
}

export default TrendinSide
