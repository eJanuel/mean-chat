const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Shout = require('../models/shout')
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

router.get('/', (req, res) => {
    res.send('Hello from API')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({username: userData.username}, (err, user) => {
        if (err) {
            console.log(err)
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
    User.findOne({_id: req.userId}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                eMail: user.eMail,
                password: user.password
            })
        }
    })
})

router.post('/profile', verifyToken, (req, res) => {
    let userData = req.body
    User.findOne({_id: req.userId}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            user.update({firstName: userData.firstName, lastName: userData.lastName, username: userData.username, eMail: userData.eMail, password: userData.password}, (error, updatedUserData) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(updatedUserData)
                }
            })
        }
    })
})

router.delete('/profile', verifyToken, (req, res) => {
    let userData = req.body
    User.deleteOne({_id: req.userId}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            console.log(user)
        }
    })
})

router.post('/search', verifyToken, (req, res) => {
    let searchData = req.body
    User.findOne({username: searchData.input}, (err, searchData) => {
        if (searchData) {
            res.json({username: searchData.username})
        } else {
                console.log(err)
        }
    })
})

router.get('/users', verifyToken, (req, res) => {
    User.find({ _id: { $ne: req.userId } }, (err, userData) => {
        if (err) {
            console.log(err)
        } else {
            res.json(userData)
        }
    })
})

router.post('/shout', verifyToken, (req, res) => {
    let shoutData = req.body
    User.findOne({_id: req.userId}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (shoutData.messageContent != '' && shoutData.messageContent != null) {
                let shout = new Shout({messageContent: shoutData.messageContent, username: user.username, userId: user._id})
                shout.save((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }
            })
        }}  
    })
})

router.get('/shout', verifyToken, (req, res) => {
    let userData = req.headers
    Shout.find({}, (err, shouts) => {
        if (err) {
            console.log(err)
        } else {
            res.json(shouts)
        }
    })
})

router.post('/friends/id', verifyToken, (req, res) => {
    User.findOne({_id: req.userId}, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
})

module.exports = router