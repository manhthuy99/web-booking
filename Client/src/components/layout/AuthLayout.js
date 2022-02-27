import React from 'react'

const AuthLayout = ({children, backgroundUrl }) => {
  return (
    <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover'
    }}>
        {children}
    </div>
  )
}

export default AuthLayout