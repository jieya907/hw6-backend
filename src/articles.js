let nextId = 4;

const articles = {
    "articles": [
        {
            "id" : 1,
            "author": "A",
            "text": "something",
            'comments': [],
        }, 
        {
            "id" : 2,
            "author": "A",
            "text": "something",
            'comments': [],
        }, 
        {
            "id" : 3,
            "author": "A",
            "text": "something",
            'comments': [],
        }

    ]

}


const showArticles = (req, res) => {
    if (req.params.id) {
        const id = parseInt(req.params.id)
        const article =  articles.articles.filter((item) => {
            return item.id === id
        })[0]
        res.send(article)
    } else if (req.params.user) {
        const article =  articles.articles.filter((item) => {
            return item.author == req.params.user
        })[0]
        res.send(article)

    }
    else {
        res.send (articles);
    }
}

const addArticle = (req, res) => {
    const newArt = {id: nextId++, text: req.body.text, author: "A"};
    articles.articles.push(newArt)
    res.send(newArt)
}

const editArticle = (req, res) => {
    const resArticles = articles.articles.map((item) => {
        if (item.id == req.params.id) {
            if (req.body.commenId && req.body.commentId == -1) {
                item.comments.push({
                    'author': 'scott',
                    'commentId': '2',
                    'date': 'somedate',
                    'text': req.body.text
                })
                return item
            } else if (req.body.commentId) {
                const comments = item.comments.map((c) => {
                    if (c.commenId == req.body.commentId) {
                        c.text = req.body.text;
                        return c
                    } else {
                        return c
                    }
                })
                item.comments = comments;
                return item
            } else {
                return req.body.text;
            }
        } else {
            return item;
        }
    })
    res.send(resArticles)
}

module.exports = (app) => {
    app.get('/articles/:id?', showArticles)
    app.post('/article', addArticle)
    app.put('/articles:id', editArticle)
}
