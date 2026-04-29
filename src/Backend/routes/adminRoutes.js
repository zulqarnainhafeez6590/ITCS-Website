import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

const router = express.Router()


const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) return res.status(403).json({ message: 'Forbidden' })
    if (!user.isAdmin) return res.status(403).json({ message: 'Admin access required' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}


router.post('/add-user', isAdmin, async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(201).json({ message: 'Admin added successfully', user: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
