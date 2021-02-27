const express = require('express');
const router = express.Router();
const lib = require('../../lib');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');

function crateToken(data, callback) {
    let payload={
        accountNumber: data.accountNumber,
        secretNumber: data.secretNumber,
        password: data.password,
        pinCode: data.pinCode,
        approved: data.approved,
        _id: data._id
    };
    jwt.sign(
        payload,
        config.secret,
        {
            expiresIn: 31556925
        },
        (err, token) => {
            payload.token = 'Bearer ' + token;
            return callback(payload);
        }
    );
}

function firstSignUp(req, res) {
    let payload = {
        accountNumber: ('RT' + lib.randomFixedInteger(10)),
        secretNumber: lib.randomFixedInteger(6),
        password: lib.randomPassword(8, 6),
        pinCode: 'xxxx',
        approved: false,
    };
    const newUser = new User(payload);
    newUser.save()
        .then((data) => {
            payload._id = data._id;
            jwt.sign(
                payload,
                config.secret,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    payload.token = 'Bearer ' + token;
                    return res.json(payload);
                }
            );
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        });
}

router.post('/signup', (req, res) => {
    firstSignUp(req, res);
});

router.post('/create-pin', (req, res) => {
    User.updateOne({_id: req.body.user._id}, {pinCode: req.body.user.pinCode})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        })
});

router.post('/change-password', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.updateOne({_id: req.body.user._id}, {password: req.body.password, secretNumber: req.body.secretNumber})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        });
});

router.post('/login', (req, res) => {
    User.findOne({$or:[{accountNumber: req.body.userId, password: req.body.password}, {email: req.body.userId, password: req.body.password}]})
        .then((user) =>{
            crateToken(user, (data) => {
                res.json(data);
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        });
    
});




module.exports = router;