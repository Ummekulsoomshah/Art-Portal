const db = require('../db/config')
// const {io}=require('../server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const { calculateTimeSpan } = require('../utils')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})
module.exports.register = async (req, res, next) => {
    const { username, email, password, role } = req.body
    const hashedPass = await bcrypt.hash(password, 10)
    try {
        await db.query('INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)', [username, email, hashedPass, role])
        const userid = await db.query('SELECT id FROM users WHERE email=?', [email])
        const id = userid[0][0].id
        const token = jwt.sign({ id: id }, 'secretkey', (err, token) => {
            res.json({
                token,
                message: 'User registered successfully'
            })
        })
    } catch {
        next(err)

    }
}

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await db.query('SELECT * FROM users WHERE email=?', [email])

        // console.log('user',user[0][0].username)
        const id = user[0][0].id
        if (user.length) {
            const validPass = await bcrypt.compare(password, user[0][0].password)
            if (validPass) {
                const token = jwt.sign({ id: id }, 'secretkey', (err, token) => {
                    res.json({
                        token,
                        message: 'User logged in successfully',
                        username: user[0][0].username
                    })
                })
            }
        }
        else {
            res.status(400).send('somwthing went wrong')
        }
    } catch (err) {
        next(err)

    }
}

module.exports.postCreate = async (req, res, next) => {
    const { description } = req.body
    const image = req.files.image
    const result = await cloudinary.uploader.upload(image.tempFilePath)
    // console.log(req.user)
    const userId = req.user.id
    try {
        const resp = await db.query('INSERT INTO posts (description,image,user_id) VALUES (?,?,?)', [description, result.secure_url, userId])
        res.status(200).json({ message: 'Post created successfully' })

    } catch (err) {
        next(err)
    }

}
module.exports.getPosts = async (req, res, next) => {

    try {
        const posts = await db.query(`SELECT
posts.id as post_id,
posts.user_id as author_id,
posts.description as post_description,
posts.image as post_image,
posts.created_at as post_created_at,
users.username as username,
COUNT(distinct likes.id) as likes_count
from posts
left join users on users.id=posts.user_id
left join likes on likes.post_id=posts.id
GROUP BY posts.id, users.id;
`)
        const postsData = posts[0]
        // const calculateTimeSpan = (createdAt) => {
        //     const createdDate = new Date(createdAt);
        //     const now = new Date();

        //     const diffMs = now - createdDate; // Difference in milliseconds
        //     const diffSec = Math.floor(diffMs / 1000); // Convert to seconds
        //     const diffMin = Math.floor(diffSec / 60); // Convert to minutes
        //     const diffHours = Math.floor(diffMin / 60); // Convert to hours
        //     const diffDays = Math.floor(diffHours / 24); // Convert to days

        //     if (diffDays > 0) return `${diffDays} day(s) ago`;
        //     if (diffHours > 0) return `${diffHours} hour(s) ago`;
        //     if (diffMin > 0) return `${diffMin} minute(s) ago`;
        //     return `${diffSec} second(s) ago`;
        // };
        const updatedPost = posts[0].map(post => {
            return {
                post_id: post.post_id,
                author_id: post.author_id,
                post_description: post.post_description,
                post_image: post.post_image,
                post_likes: post.likes_count,
                post_created_at: calculateTimeSpan(post.post_created_at),
                username: post.username
            }
        })
        // console.log(updatedPost)

        // console.log(postsData)
        res.status(200).json({
            updatedPost,
            message: 'Posts fetched successfully'
        })
    } catch (err) {
        next(err)
    }
}

module.exports.likepost = async (req, res, next) => {
    const postId = req.params.id
    const userId = req.user.id
    try {
        const like = await db.query('INSERT INTO likes (post_id,user_id) VALUES (?,?)', [postId, userId])
        const [rows] = await db.query(`
            SELECT user_id FROM posts WHERE id = ?`, [postId])
        const [userrow]=await db.query(`
            SELECT username from users WHERE id=?`,[userId])
        const recipientId = rows[0].user_id;
        const userName = userrow[0].username;
        

        const message = `${userName} liked your post.`;
        const insertNotification = await db.query(`
            INSERT INTO notifications (recipient_id,
actor_id,
post_id,
type,
message)
VALUES(?,?,?,?,?)`, [recipientId, userId, postId, 'like', message])
        const notifications = {
            recipient_id: recipientId, 
            actor_id: userId, 
            post_id: postId, 
            type: 'like',
             message
        }
        res.status(200).json({
            notifications
        })
    } catch (err) {
        next(err)
    }
}

module.exports.comment = async (req, res, next) => {
    const postId = req.params.id
    const userId = req.user.id
    const { comment } = req.body
    try {
        const usercomment = await db.query('INSERT INTO comments (comment,post_id,user_id) VALUES (?,?,?)', [comment, postId, userId])
        const [rows] = await db.query(`
            SELECT user_id FROM posts WHERE id = ?`, [postId])
        const [userrow]=await db.query(`
            SELECT username from users WHERE id=?`,[userId])
        const recipientId = rows[0].user_id;
        const userName = userrow[0].username;
        

        const message = `${userName} commented on your post.`;
        const insertNotification = await db.query(`
            INSERT INTO notifications (recipient_id,
actor_id,
post_id,
type,
message)
VALUES(?,?,?,?,?)`, [recipientId, userId, postId, 'comment', message])
const notifications = {
    recipient_id: recipientId, 
    actor_id: userId, 
    post_id: postId, 
    type: 'comment',
     message
}
        res.status(200).json({
            usercomment,
            message: 'Commented successfully'
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getComments = async (req, res, next) => {
    const postId = req.params.id
    // console.log("postId", postId)
    try {
        const comments = await db.query(
            `SELECT 
            comments.id as comment_id,
            comments.comment as comment,
            comments.created_at as comment_created_at,
            users.username as comment_author
            from comments
            INNER JOIN users ON comments.user_id = users.id
            WHERE comments.post_id = ?`, [postId])
        const commentsData = comments[0].map(comment => ({
            comment: comment.comment,
            comment_created_at: calculateTimeSpan(comment.comment_created_at),
            comment_author: comment.comment_author
        }));


        res.status(200).json({
            commentsData,
            message: 'Comments fetched successfully'
        })
    } catch (err) {
        next(err)
    }
}
module.exports.trendingPosts = async (req, res, next) => {
    try {
        const trendingPosts = await db.query(`
            SELECT
 posts.id,
  posts.description,
  posts.image,
  users.username AS author,
  COUNT(likes.id) AS likes_count
  from posts
  LEFT JOIN users on posts.user_id=users.id
  LEFT JOIN likes ON likes.post_id = posts.id
  GROUP BY posts.id, users.id
ORDER BY likes_count DESC
LIMIT 10;
  
`)
        const trendingPostsData = trendingPosts[0]
        // console.log(typeof(trendingPostsData))
        // console.log("trendingPostsData",trendingPosts)
        res.status(200).json({
            trendingPostsData,
            message: "trending post fetched"
        })


    } catch (err) {
        next(err)

    }
}

module.exports.notifications = async (req, res, next) => {
    const userId = req.user.id
    const token=req.token
    console.log("req.token",req.token)
    // console.log(req.token)
    try {
        const notifications = await db.query(
      'SELECT * FROM notifications WHERE recipient_id = ? ORDER BY created_at DESC',
            [userId] )
            console.log("poster id",userId)
        const notificationData=notifications[0].map((notification)=>({
            actor_id:notification.actor_id,
            type:notification.type,
            message: notification.message,
            is_read:notification.is_read
        }))
        res.status(200).json({
            notificationData,
            token,
            message: 'Notifications fetched successfully'
        })

    } catch (err) {
        next(err)
    }
}