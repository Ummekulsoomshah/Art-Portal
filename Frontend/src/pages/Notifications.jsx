import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        try {
            const getNotifications = async () => {
                const res = await axios.get('http://localhost:3000/user/notifications', {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.status === 200) {
                    console.log('Notifications fetched successfully')
                    console.log(res.data)
                    const notifications = res.data.notificationData
                    setNotifications(notifications)
                    // socket.on('notification', (notification) => {
                    //     setNotifications((prev) => [notification, ...prev])
                    // })
                    // return () => {
                    //     socket.off('notification');
                    // };
                } else {
                    console.log('Error')
                }
            }
            getNotifications()

        } catch (error) {
            console.log(error)
        }
        // socket.on('notification', (notification) => {
        //     setNotifications((prev) => [notification, ...prev])
        //     console.log("meesage on client", notification)
        // })
        // return () => {
        //     socket.off('notification');
        // };
        
    }, [])
    console.log(notifications)



    // socket.on("notification",(data)=>{
    //     console.log("from server the notifications is ",data)
    //     // setNotifications(data)
    // })
    return (
        <div className=" fixed top-0 right-0 w-1/4 h-screen p-6 bg-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
            <ul className="space-y-4">
                {notifications.map((notification, index) => (
                    <li
                        key={index}
                        className="p-4 bg-gray-700 text-white rounded-lg shadow animate-fade-left"
                    >
                        <p>{notification.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notifications
