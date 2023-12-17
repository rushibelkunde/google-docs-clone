# Google Docs Clone

A real-time collaborative document editing web application inspired by Google Docs. This project is built using Express, React, Socket.io, and MongoDB.

## Features

- Create new documents
- Real-time collaborative editing
- Multiple users can edit a document simultaneously
- Automatic document saving
- MongoDB integration for data storage

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/google-docs-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd google-docs-clone
   ```

3. Install dependencies for the server:

   ```bash
   cd server
   npm install
   ```

4. Install dependencies for the client:

   ```bash
   cd ../client
   npm install
   ```

5. Create a `.env` file in the `server` directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

6. Start the server:

   ```bash
   cd ../server
   npm start
   ```

7. Start the client:

   ```bash
   cd ../client
   npm start
   ```

8. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
google-docs-clone/
│
├── client/                  # React client application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/                  # Express server application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── configs/
│   ├── server.js
│   └── ...
│
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Feel free to contribute to the project. Fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.