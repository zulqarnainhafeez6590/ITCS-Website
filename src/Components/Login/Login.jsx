import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/msalConfig'
import { apiUrl } from '../../config/api'
import alignitLogo from '../../assets/logos/itcsLogo.png'
import './Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const { instance } = useMsal()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    
    if (token && user?.isAdmin) {
      navigate('/admin', { replace: true })
      return
    } else if (token) {
      navigate('/admin', { replace: true })
      return
    }

    const accounts = instance.getAllAccounts()
    if (accounts.length > 0 && !token) {
      instance.clearCache()
    }
  }, [])

  const handleMicrosoftLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await instance.loginPopup(loginRequest)
      await handleMicrosoftLoginSuccess(response.account)
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Failed to sign in with Microsoft 365')
      setLoading(false)
    }
  }

  const handleMicrosoftLoginSuccess = async (account) => {
    try {
      // Get access token
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      })

      // Send token to backend for verification
      const response = await fetch(apiUrl('/api/auth/microsoft'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: tokenResponse.accessToken,
          email: account.username,
          name: account.name,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setLoading(false)
        throw new Error(data.message || 'Authentication failed.')
      }

      // Store auth info
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('email', data.user.email)

      setLoading(false)
      navigate('/admin', { replace: true })
    } catch (err) {
      console.error('Backend authentication error:', err)
      setError(err.message || 'Failed to authenticate with server')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <img src={alignitLogo} alt="ITCS Logo" className="login-logo" />
            <p className="card-subtitle">Log in to access your dashboard</p>
          </div>



          <div className="login-form">
            {error && (
              <div className="error-message" style={{ 
                color: '#ff4444', 
                marginBottom: '1rem', 
                textAlign: 'center',
                padding: '0.5rem',
                backgroundColor: '#ffe6e6',
                borderRadius: '4px'
              }}>
                {error}
              </div>
            )}

            <button 
              type="button" 
              className="submit-btn microsoft-btn" 
              onClick={handleMicrosoftLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#0078d4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '1rem'
              }}
            >
              {loading ? (
                <span className="loading-spinner">Signing in...</span>
              ) : (
                <>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="9" height="9" fill="#F25022"/>
                    <rect x="10.5" y="0.5" width="9" height="9" fill="#7FBA00"/>
                    <rect x="0.5" y="10.5" width="9" height="9" fill="#00A4EF"/>
                    <rect x="10.5" y="10.5" width="9" height="9" fill="#FFB900"/>
                  </svg>
                  Sign in with Microsoft 365
                </>
              )}
            </button>

            <div className="form-footer">
              <button
                type="button"
                className="back-home-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
