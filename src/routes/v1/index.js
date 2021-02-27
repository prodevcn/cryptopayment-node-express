const express = require('express');
const router = express.Router();
const userRouter = require('./user');
router.use('/user', userRouter);
router.get('/test', (req, res) => {
    res.json('server works well !');
})
module.exports = router;