
/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`


describe('Validate Profile functionality', () => {

    it('should update the headlines', (done) => { 
        
        const options = { method: "PUT", headers: { 'Content-Type': 'application/json' }}

        options.body = JSON.stringify({ headline: "something"})
        fetch(url('/headline'), options)
            .then( res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.headline).to.eql('something')
            })
            .then(done)
            .catch(done)
    })

});
