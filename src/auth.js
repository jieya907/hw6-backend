const md5 = require('md5')

let user2Credentials = {}

const getUser = (username) => {
    return user2Credentials[username]
}

const getHash = (username, password) => {
    console.log(user2Credentials[username].salt)
    return md5(user2Credentials[username].salt + password)
}

const register = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;


    const salt = Math.random();
    const hash = md5(salt + password)

    user2Credentials[username] = {'salt' : salt, 'hash': hash}
    var msg = { username: username, result: 'success'}
    res.send(msg)
}


const login = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    const userObj = getUser(username)

    if (!userObj || userObj.hash !== getHash(username,password)) {
        res.sendStatus(401)
        return
    }

    //res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600 * 1000, httpOnly: true})

    var msg = { username: username, result: 'success'}
    res.send(msg)
}


const logout = () => {
    res.send('OK')
}

const cookieKey = 'sid'

const isLoggedIn = (req, res, next) => {
    const sid = req.cookies[cookieKey]

    if (!sid) {
        return res.sendStatus(401)
    }

    const username = sessionUser[sid]
    if (username) {
        req.username = username
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = (app) => {
    app.post('/register', register)
    app.post('/login', login)

    app.put('/logout', logout)
}
