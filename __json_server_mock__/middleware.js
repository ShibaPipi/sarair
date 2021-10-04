module.exports = (request, response, next) => {
  if (request.method === 'POST' && request.path === '/login') {
    if (request.body.username === 'pdrol' && request.body.password === '111111') {
      return response.status(200).json({
        name: request.body.username,
        token: '123'
      })
    } else {
      return response.status(400).json({ message: 'invalid username or password' })
    }
  }

  if (/users|projects/.test(request.path)) {
    if (!request.headers['Authorization'.toLowerCase()]) {
      return response.status(401).json({ message: 'Unauthorized.' })
    }
  }

  if (request.method === 'GET' && request.path === '/me') {
    return response.status(200).json({
      name: 'pdrol',
      token: '123'
    })
  }

  next()
}
