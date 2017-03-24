
/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`


describe('Validate Article functionality', () => {

    it('should give me three or more articles', (done) => {
        // IMPLEMENT ME
        fetch(url("/articles"))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.articles).to.have.length.above(2)
            })
            .then(done)
            .catch(done)
    }, 200)

    it('should add two articles with successive article ids, and return the article each time', (done) => {
        let prevId;

        const options = { method: "POST", headers: { 'Content-Type': 'application/json' }}
        options.body = JSON.stringify({ text: "something"})
        fetch(url("/article"),options)
            .then( res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then( body => {
                prevId = body.id
                expect(body.id).to.be.ok;
                expect(body.text).to.eql("something")
            })
            .then ( _ => {
                const options = { method: "POST", headers: { 'Content-Type': 'application/json' }}
                options.body = JSON.stringify({ text: "something else"})

                fetch(url("/article"), options)
                    .then( res => {
                        expect(res.status).to.be.eql(200)
                        return res.json()
                    }).then ( body => {
                        expect(body.id).to.eql(prevId +1)
                        expect(body.text).to.eql("something else")
                    })
            })
            .then(done)
            .catch(done)
        // add a new article
        // verify you get the article back with an id
        // verify the content of the article
        // add a second article
        // verify the article id increases by one
        // verify the second artice has the correct content
    }, 200)

    it('should return an article with a specified id', (done) => {
        // call GET /articles first to find an id, perhaps one at random
        // then call GET /articles/id with the chosen id
        // validate that only one article is returned
        let content;
        fetch(url("/articles") )
            .then (res =>  {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then (body => {
                let article = body.articles.filter((item)=> {
                    return item.id === 2
                })[0]
                content = article.text;
            })
            .then (fetch(url("/articles/2"))
                .then(res => {
                    expect(res.status).to.eql(200)
                    return res.json() 
                })
                .then(body=> {
                    expect(body.text).to.eql(content)
                }))
            .then(done)
            .catch(done)
    }, 200)

    it('should return nothing for an invalid id', (done) => {
        // call GET /articles/id where id is not a valid article id, perhaps 0
        // confirm that you get no results
        fetch(url("/articles/0"))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json() 
            })
            .then(done)
            .catch(r => {
                expect(r).to.be.Error
                done()
            })
    }, 200)

});
