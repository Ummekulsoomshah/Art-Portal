# 🎨 ArtConnect - Your Creative Hub 🖌️

Welcome to **ArtConnect**, the ultimate platform for artists, art lovers, and collectors to connect, showcase, and trade stunning artworks. Dive into a vibrant community and let your creativity flourish!

---
The project is built on React.js,Tailwind css on frontend and Node.js,Express on backend and Mysql for database.
## 🔧 Features

### For Artists
- **🎨 Showcase Your Art**: Upload and share your masterpieces with the world.
- **🌐 Global Reach**: Gain exposure to art enthusiasts worldwide.
- **📊 Insights**: Get detailed analytics on comments, likes, and notifications on posts.

### For Collectors
- **💸 Buy Artworks**: Discover and purchase exclusive art pieces.
- **🌍 Explore Categories**: Filter by style, medium, or price range.
- **🚀 Personalized Recommendations**: Find art that matches your taste.

### For Art Lovers
- **👍 Like & Comment**: Interact with your favorite artists and artworks.
- **📒 Create Collections**: Curate your personal gallery of favorite pieces.

---

## 🔍 API Documentation

### Base URL: `http://localhost:3000`

### Authentication
All APIs require authentication using a Bearer Token.

#### Login
**POST** `/user/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "token": "your-access-token",
  "user": {
    "id": 1,
    "name": "Jane Doe"
  }
}
```

#### Register
**POST** `/user/register`
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Jane Doe"
  }
}
```

### Artwork Management

#### Upload Artwork
**POST** `/user/createpost`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "title": "Sunset Bliss",
  "description": "A serene sunset by the beach",
  "image": "<base64-encoded-image>"
}
```

**Response**:
```json
{
  "message": "Artwork uploaded successfully",
  "artwork": {
    "id": 1,
    "title": "Sunset Bliss"
  }
}
```

`

### Notifications

#### Get Notifications
**GET** `/user/notifications`
- **Headers**: `Authorization: Bearer <token>`

**Response**:
```json
[
  {
    "id": 1,
    "message": "Your artwork 'Sunset Bliss' received a new like!"
  }
]
```

---

## 💼 Setup Guidelines

### Prerequisites
- Node.js (v16 or higher)
- MySql Workbench

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Art-Portal.git
   cd Art-Portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
If you’re using a React frontend:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

---

## 🎉 Contribute
We welcome contributions from the community!
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Added new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## 📢 Contact
For any queries or support, feel free to reach out:
- **Email**: ummekulsoom215@gmail.com

---

Enjoy your journey with **ArtConnect** and let creativity thrive! 🌟

