import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import axios from 'axios'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

const ALLOWED_ADMIN_EMAILS = process.env.ALLOWED_ADMIN_EMAILS
  ? process.env.ALLOWED_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : ['zulqarnain.hafeez@itcs.com.pk'];

const TENANT_ID = process.env.VITE_MSAL_TENANT_ID || '758534da-3ea2-42b7-a22c-2824e941888d'
const CLIENT_ID = process.env.VITE_MSAL_CLIENT_ID || 'c0e2a10c-63c6-4646-a4d6-b955ffc06f43'

const jwksClient = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
  cacheMaxAge: 86400000,
})


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
    const { accessToken, idToken, email, name } = req.body

    if (!accessToken && !idToken) {
      return res.status(400).json({ message: 'Missing authentication token' })
    }

    let userEmail, userName

    // Verify token with Microsoft Graph API (primary)
    if (accessToken) {
      try {
        const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
          timeout: 15000
        })

        const microsoftUser = graphResponse.data
        userEmail = microsoftUser.mail || microsoftUser.userPrincipalName
        userName = microsoftUser.displayName || microsoftUser.givenName
      } catch (graphError) {
        const errDetail = graphError.response?.data || graphError.message
        console.error('Microsoft Graph API error:', typeof errDetail === 'string' ? errDetail : JSON.stringify(errDetail))
        console.error('Graph API failed, attempting ID token validation...')
      }
    }

    // Fallback: validate ID token locally
    if (!userEmail && idToken) {
      try {
        const decoded = await new Promise((resolve, reject) => {
          jwt.verify(
            idToken,
            (header, callback) => {
              jwksClient.getSigningKey(header.kid, (err, key) => {
                if (err) return callback(err)
                callback(null, key.getPublicKey())
              })
            },
            {
              audience: CLIENT_ID,
              issuer: [`https://login.microsoftonline.com/${TENANT_ID}/v2.0`, `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`],
            },
            (err, decoded) => {
              if (err) return reject(err)
              resolve(decoded)
            }
          )
        })
        userEmail = decoded.preferred_username || decoded.email || decoded.upn || email
        userName = decoded.name || decoded.given_name || name
        console.log('ID token validated successfully for:', userEmail)
      } catch (idTokenError) {
        console.error('ID token validation error:', idTokenError.message)
        const errDetail = idTokenError.response?.data || idTokenError.message
        return res.status(401).json({ message: `Authentication failed: ${errDetail}` })
      }
    }

    if (!userEmail) {
      return res.status(401).json({ message: 'Could not extract user identity. Check server logs.' })
    }

    const isAllowedAdmin = ALLOWED_ADMIN_EMAILS.includes(userEmail.toLowerCase());

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

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
  } catch (error) {
    console.error('Microsoft login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router