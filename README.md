# WonderLust - Vacation Rental Platform

WonderLust is a full-stack web application inspired by Airbnb that allows users to browse, list, and review vacation rentals.

## Features

- **User Authentication**
  - Secure signup/login system using Passport.js
  - User authorization for protected routes
  - Session management with MongoDB store

- **Listing Management**
  - Create, read, update, and delete property listings
  - Image upload with Cloudinary integration
  - Location-based property search
  - Property details with pricing and descriptions

- **Review System**
  - Add/delete reviews for properties
  - Star rating system
  - User-specific review management

- **Responsive Design**
  - Mobile-friendly interface
  - Bootstrap-based layout
  - Custom CSS styling

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Cloudinary
- Multer

### Frontend
- EJS Templates
- Bootstrap 5
- Custom CSS
- JavaScript

### Tools & Security
- dotenv for environment variables
- express-session for session management
- JOI for data validation
- Method-override for HTTP methods
- Connect-flash for notifications

## Installation
1. Clone the repository
git clone https://github.com/yourusername/wonderlust.git

2. Install dependencies
npm install

3. Create a .env file with required environment variables:
SECRET=your_secret
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
ATLASDB_URL=your_mongodb_url
SESSION_SECRET=your_session_secret

4. Start the server
node app.js

## Usage

1. Navigate to http://localhost:8080 in your browser.
2. Sign up for a new account or log in with an existing account.
3. Browse listings, add new listings, and leave reviews.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author 
CoderKP