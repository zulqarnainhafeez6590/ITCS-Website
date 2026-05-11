import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

const ALLOWED_ADMIN_EMAILS = process.env.ALLOWED_ADMIN_EMAILS
  ? process.env.ALLOWED_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : ['zulqarnain.hafeez@itcs.com.pk'];


// Login route (for manual login - kept for backward compatibility)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    //user checking
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: 'Email does not exist' });

    // Check if user has a password (OAuth users might not have one)
    if (!user.password) {
      return res.status(400).json({ message: 'Please use Microsoft 365 to sign in' });
    }

    // password comparison 
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password' });

    // token generation 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ message: 'Login successful', token, user: { ...user, password: undefined } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Microsoft OAuth login route
router.post('/microsoft', async (req, res) => {
  try {
    const { accessToken, email, name } = req.body

    if (!accessToken || !email) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Verify token with Microsoft Graph API
    try {
      const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 15000 // 15 seconds timeout
      })

      const microsoftUser = graphResponse.data
      const userEmail = microsoftUser.mail || microsoftUser.userPrincipalName || email
      const userName = microsoftUser.displayName || name || microsoftUser.givenName || 'User'
      const isAllowedAdmin = ALLOWED_ADMIN_EMAILS.includes(userEmail.toLowerCase());

      // Check if user exists in database
      let user = await User.findOne({ email: userEmail })

      if (!user) {
        user = new User({
          fullName: userName,
          username: userEmail.split('@')[0],
          email: userEmail,
          password: '',
          role: isAllowedAdmin ? 'admin' : 'user',
          isAdmin: isAllowedAdmin,
        })
        await user.save()
      } else {
        user.fullName = userName
        user.isAdmin = isAllowedAdmin;
        user.role = isAllowedAdmin ? 'admin' : 'user';
        await user.save()
      }

      if (!user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. You are not authorized to access the admin panel.' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      // Include isAdmin in response
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isAdmin: user.isAdmin,
        },
      })
    } catch (graphError) {
      const errDetail = graphError.response?.data || graphError.message
      console.error('Microsoft Graph API error:', JSON.stringify(errDetail))
      console.error('Full error:', graphError.code, graphError.message)
      return res.status(401).json({ message: `Invalid Microsoft token: ${typeof errDetail === 'string' ? errDetail : errDetail.error?.message || errDetail.message || 'Unknown error'}` })
    }
  } catch (error) {
    console.error('Microsoft login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router