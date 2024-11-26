import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path'; 
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import auth from './middleware/auth.js'; // Import auth middleware

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend")));

// Protect the dashboard.html route
app.get('/dashboard.html', auth, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dashboard.html"));
});

// Serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Error Handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
