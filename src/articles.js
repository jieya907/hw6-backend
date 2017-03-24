let nextId = 4;

const articles = {
  "articles": [
    {
      "id" : 1,
      "author": "A",
      "text": "something"
    }, 
    {
      "id" : 2,
      "author": "A",
      "text": "something"
    }, 
{
      "id" : 3,
      "author": "A",
      "text": "something"
    }

  ]

}


const showArticles = (req, res) => {
    if (req.params.id) {
        const id = parseInt(req.params.id)
        console.log("in first if statement id is " + id)
        const article =  articles.articles.filter((item) => {
            return item.id === id
        })[0]
        console.log(article)
        res.send(article)
    }else {
        res.send (articles);
    }
}

const addArticle = (req, res) => {
  const newArt = {id: nextId++, text: req.body.text, author: "A"};
    console.log(newArt)
    articles.articles.push(newArt)
     res.send(newArt)
}

module.exports = (app) => {
    app.get('/articles/:id?', showArticles)
    app.post('/article', addArticle)
}
