import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);

        try {
            const resp = await axios.post('http://localhost:3000/user/postCreate', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Specify content type
                        "authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (resp.status === 200) {
                navigate('/home');
            }
            else {
                console.log('error')
            }


        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-3/4  p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Create a New Post</h2>
                <form className="space-y-4" onSubmit={(e) => { submitHandler(e) }}>
                    {/* Title */}


                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            name="description"
                            placeholder="Write a brief description of your post"
                            rows="4"
                            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-300 mb-2">
                            Upload Image
                        </label>
                        <input
                            required
                            // value={resume}
                            onChange={(e) => { setImage(e.target.files[0]) }}
                            type="file"
                            id="image"
                            name="image"
                            className="w-full p-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreatePost
