import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import jobsRoutes from './routes/jobs.js';


dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/jobsAdd', jobsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err))

// Start server
const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

export default app
