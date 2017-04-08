const following = [1, 3, 5]

const getFollowing = (req, res) => {
    res.send(following)
}

const addFollowing = (req, res) => {
    following.push(req.params.user)
    res.send(following)
}

const deleteFollowing = (req, res) => {
    following = following.filter( (item) => {
        item != req.params.user
    })

    res.send(following)
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', addFollowing)
    app.delete('/following/:user', deleteFollowing)
}
