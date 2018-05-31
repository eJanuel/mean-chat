const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://127.0.0.1:27017/angularauth"

mongoose.connect(db, err => {
    if (err) {
        console.error('error' + err)
    } else {
        console.log('Connected to Mongodb')
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request') 
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req,res) => {
    res.send('Hello from API')
})

router.post('/register', (req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({username: userData.username}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid username')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
            
        }
    })
})

router.get('/profile', verifyToken, (req, res) => {

})

router.get('/friends', verifyToken, (req,res) => {
    let friends = [
        {
          "name": "Padami"
        },
        {
          "name": "Padami2"
        },
        {
          "name": "Padami3"
        },
        {
          "name": "Salami"
        }
    ]  
      res.json(friends)
  })

module.exports = router