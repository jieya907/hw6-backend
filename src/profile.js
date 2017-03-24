
const index = (req, res) => {
    res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
    let body = {"headlines": []};
    if (req.params.user) {
        body["headlines"] = [{ "username": req.params.user, "headline": "Happy"}];
    } else {
        body["headlines"] = [{ "username": "Scott", "headline": "Happy"}];
    }
    res.send(body)
}

const putHeadline = (req, res) => {
    res.send({
        "username" : "Scott",
        "headline" : req.body.headline
    })
}
const email = (req, res) => {
    res.send({
        "username": "scott",
        "email": req.body.email
    })
}

const getEmail = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "email" : "someone@abc.com"
        })

    } else {
        res.send ({
            "username" :"scott",
            "email" : "someone@abc.com"
        })
    }
}

const zipcode = (req, res) => {
    res.send({
        "username": "scott",
        "zipcode": req.body.zipcode
    })
}

const getZipcode = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "zipcode" : "77005"
        })

    } else {
        res.send ({
            "username" :"scott",
            "zipcode" : "77005"
        })
    }
}
const avatar = (req, res) => {
    res.send({
        "username": "scott",
        "avatar": req.body.avatar
    })
}

const getAvatar = (req, res) => {
    if (req.params.user) {
        res.send ({
            "username" :req.params.user,
            "avatars" : [{"username": req.params.user, "avatar": "someurl"}]
        })

    } else {
        res.send ({
            "username" :"scott",
            "avatars" : [{"username": "someone", "avatar": "someurl"}]
        })
    }
}
module.exports = app => {
    app.get('/', index)
    app.get("/headlines/:user?", getHeadline)
    app.put("/headline", putHeadline);
    app.put("/email", email);
    app.get("/email/:user?", getEmail);
    app.get("/zipcode/:user?", getZipcode);
    app.put("/zipcode", zipcode);
    app.get("/avatars/:user?", getAvatar);
    app.put("/avatar", avatar);
}
