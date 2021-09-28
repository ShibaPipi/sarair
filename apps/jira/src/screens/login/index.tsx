import React, { FormEvent } from 'react'
import { sarairRequest } from '@sarair/common/request'

export const LoginScreen: React.FC = () => {
  const login = (param: { username: string; password: string }) => {
    sarairRequest
      .post('login', {
        data: param
      })
      .then((res) => {
        console.log(res)
      })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value

    login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id="password" />
      </div>
      <button type={'submit'}>登录</button>
    </form>
  )
}
