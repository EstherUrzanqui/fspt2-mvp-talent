const express = require('express')

const db = require('./model/helper.js')

const routes = express.Router()

routes.get('/candidate' , (req, res) => {
    db('select * from candidate;').then(results => {
        if(results.error) {
            res.status(400).send({ message: 'There was an error'})
        }
        
        res.send(results.data)
    })
}) 

module.exports = routes