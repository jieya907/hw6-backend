
const index = (req, res) => {
    res.send({ hello: 'world' })
}

let user = {
    'username': 'Scott',
    'headline': 'Happy',
    'email': 'someone@abc.com',
    'zipcode': '77005',
    'avatar': 'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg'
}

const getHeadline = (req, res) => {

    const users = req.params.users ? req.params.users.split(',') : [req.user]
    let body;
    if (req.params.user) {
        body["headlines"] = [{ "username": users[0], "headline": user.headline}];
    } else {
        body["headlines"] = [{ "username": "Scott", "headline": user.headline}];
    }
    res.send(body)
}

const putHeadline = (req, res) => {
    user.headline = req.body.headline
    res.send({
        "username" : user.username,
        "headline" : req.body.headline
    })
}

const email = (req, res) => {
    user.email = req.body.email;
    res.send({
        "username": "scott",
        "email": req.body.email
    })
}

const getEmail = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "email" : user.email,
        })

    } else {
        res.send ({
            "username" :"scott",
            "email" : user.email
        })
    }
}

const zipcode = (req, res) => {
    user.zipcode = req.body.zipcode
    res.send({
        "username": user.username,
        "zipcode": req.body.zipcode
    })
}

const getZipcode = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "zipcode" : user.zipcode
        })

    } else {
        res.send ({
            "username" :"scott",
            "zipcode" : user.zipcode
        })
    }
}
const avatar = (req, res) => {
    user.avatar = req.body.avatar;
    res.send({
        "username": "scott",
        "avatar": req.body.avatar
    })
}

const getAvatar = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "avatars" : [{"username": req.params.user, "avatar": user.avatar}]
        })

    } else {
        res.send ({
            "username" :user.username,
            "avatars" : [{"username": user.username, "avatar": user.avatar}]
        })
    }
}

const getDob = (req, res) => {
    res.send({'dob':'652165200000'})
}

module.exports = app => {
    app.get('/', index)
    app.get("/headlines/:user?", getHeadline)
    app.put("/headline", putHeadline);
    app.put("/email", email);
    app.get("/email/:user?", getEmail);
    app.get('/dob', getDob)
    app.get("/zipcode/:user?", getZipcode);
    app.put("/zipcode", zipcode);
    app.get("/avatars/:user?", getAvatar);
    app.put("/avatar", avatar);
}
