// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import alignitLogo from '../../assets/logos/itcsLogo.png'
// import './Signup.scss'


// const Signup = () => {
//   const navigate = useNavigate()
  
//   const [formData, setFormData] = useState({
//   fullName: '',
//   username: '',
//   email: '',
//   password: '',
//   confirmpassword: ''
// })


//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       document.querySelector('input[name="fullName"]')?.focus()
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [])

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.fullName.trim())
//       newErrors.fullName = 'Full name is required'
//     if (!formData.username.trim())
//       newErrors.username = 'Username is required'
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid'
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters'
//     }
//     if (formData.confirmpassword !== formData.password) {
//       newErrors.confirmpassword = 'Passwords do not match'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }))
//     }
//   }

// const handleSubmit = async (e) => {
//   e.preventDefault()
//   if (!validateForm()) return

  
//   const { fullName, username, email, password, confirmpassword } = formData

//   setIsSubmitting(true)
//   try {
//     const response = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ fullName, username, email, password }), 
//     })

//     const data = await response.json()
//     if (!response.ok) throw new Error(data.message || 'Signup failed.')

//     navigate('/login')
//   } catch (err) {
//     setErrors({ submit: err.message })
//   } finally {
//     setIsSubmitting(false)
//   }
// }


//   return (
//     <div className="signup-page">
//       <div className="signup-bg-overlay" />
//       <div className="signup-container">
//         <div className="signup-card">
//           <div className="card-header">
//             <img src={alignitLogo} alt="ITCS Logo" className="logo" />
//             <h1 className="card-title">Create Your Account</h1>
//           </div>
//           <form className="signup-form" onSubmit={handleSubmit}>
//             {errors.submit && (
//               <div className="error-message">{errors.submit}</div>
//             )}

//             {/* Full Name Field */}
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className={errors.fullName ? 'input-error' : ''}
//               />
//               {errors.fullName && (
//                 <span className="error-text">{errors.fullName}</span>
//               )}
//             </div>

//             {/* Username Field */}
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={errors.username ? 'input-error' : ''}
//               />
//               {errors.username && (
//                 <span className="error-text">{errors.username}</span>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={errors.email ? 'input-error' : ''}
//               />
//               {errors.email && (
//                 <span className="error-text">{errors.email}</span>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'input-error' : ''}
//               />
//               {errors.password && (
//                 <span className="error-text">{errors.password}</span>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmpassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmpassword}
//                 onChange={handleChange}
//                 className={errors.confirmpassword ? 'input-error' : ''}
//               />
//               {errors.confirmpassword && (
//                 <span className="error-text">{errors.confirmpassword}</span>
//               )}
//             </div>

          

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="submit-btn"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="loading-spinner">Creating Account...</span>
//               ) : (
//                 'Sign Up'
//               )}
//             </button>

//             <div className="form-footer">
//               <p>
//                 Already have an account?{' '}
//                 <button
//                   type="button"
//                   className="link-btn"
//                   onClick={() => navigate('/login')}
//                 >
//                   Sign In
//                 </button>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
