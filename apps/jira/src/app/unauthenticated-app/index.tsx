import React, { useState } from 'react'

import { Login } from './components/Login'
import { Register } from './components/Register'

import { Card } from '@sarair/shared/ui'

export const UnauthenticatedApp: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <Login /> : <Register />}
        <button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? '注册' : '登录'}
        </button>
      </Card>
    </div>
  )
}
