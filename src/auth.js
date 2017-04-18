const md5 = require('md5')
const User = require('./model.js').User
const Profile = require('./model.js').Profile

let sessionUser = {}

let cnter = 0;

const cookieKey = 'sid'

const getUser = (username, callback) => {
    let obj
    User.find({username, username}).exec((err, obj) => {
        callback({salt : obj[0].salt, hash: obj[0].hash})
    })
}

const getHash = (salt, password) => {
    return md5(salt + password)
}

const register = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const email = req.body.email;
    const zipcode  = req.body.zipcode;

    const prof = {
        username: username,
        headline: "",
        following: [],
        email: req.body.email,
        zipcode: req.body.zipcode,
        avatar: ""
    }

    new Profile(prof).save((err, prof) => {
        console.log("saved a new profile")

        updatePassword(username, password, res)
    })
}

const generateCode = (username) => {
    cnter += 1
    return cnter.toString();
}

const login = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    getUser(username, (userObj) => {
        console.log("user obj is ", userObj)
        if (!userObj || userObj.hash !== getHash(userObj.salt,password)) {
            res.sendStatus(401)
            return
        } else {
            const sessionId = generateCode(username);
            res.cookie(cookieKey, sessionId, {maxAge: 3600 * 1000, httpOnly: true})

            sessionUser[sessionId] = username;

            var msg = { username: username, result: 'success'}
            res.send(msg)
        }
    })

}


const logout = (req, res) => {
    delete sessionUser[req.cookies[cookieKey]]
    console.log("after delete cookie")
    console.log(sessionUser)
    res.send('OK')
}

const isLoggedIn = (req, res, next) => {
    const sid = req.cookies[cookieKey]

    if (!sid) {
        return res.sendStatus(401)
    }

    const username = sessionUser[sid]
    if (username) {
        console.log("in isLoggedIn ", username)
        req.username = username
        next()
    } else {
        res.sendStatus(401)
    }
}

exports.isLoggedIn = isLoggedIn

const password = (req, res) => {
    updatePassword(req.username, req.body.password, res);
}


const updatePassword = (username, password, res) => {

    const salt = Math.random();
    const hash = md5(salt + password)
    User.remove({username: username}, (err) => {
        if (err) return handleError(err);
        console.log("removed entries for " + username)
    })

    new User({username: username, salt: salt, hash: hash }).save((err, obj)=> {
        console.log("saved a user object")
    })
    var msg = { username: username, result: 'success'}

    // set the cookies 
    const sessionId = generateCode(username);
    res.cookie(cookieKey, sessionId, {maxAge: 3600 * 1000, httpOnly: true})

    sessionUser[sessionId] = username;

    res.send(msg)
}

exports.endpoints = (app) => {
    app.post('/register', register)
    app.post('/login', login)

    app.put('/logout', isLoggedIn, logout)
    app.put('/password', isLoggedIn, password)
}
