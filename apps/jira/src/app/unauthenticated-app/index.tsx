import React, { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'

export const UnauthenticatedApp: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  return (
    <div>
      {isRegister ? <Login /> : <Register />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '注册' : '登录'}
      </button>
    </div>
  )
}
