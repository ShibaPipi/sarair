const NAME = 'pdrol'
const PASSWORD = '111111'
const TOKEN = '123'

module.exports = (request, response, next) => {
    if (request.method === 'POST' && request.path === '/login') {
        if (
            request.body.username === NAME &&
            request.body.password === PASSWORD
        ) {
            return response.status(200).json({
                name: request.body.username,
                token: TOKEN
            })
        } else {
            return response
                .status(400)
                .json({ message: 'invalid username or password' })
        }
    }

    if (request.method === 'POST' && request.path === '/register') {
        return response.status(200).json({
            name: request.body.username,
            token: TOKEN
        })
    }

    if (/users|projects/.test(request.path)) {
        if (!request.headers['Authorization'.toLowerCase()]) {
            return response.status(401).json({ message: 'Unauthorized.' })
        }
    }

    if (request.method === 'GET' && request.path === '/me') {
        return response.status(200).json({
            name: NAME,
            token: TOKEN
        })
    }

    next()
}
