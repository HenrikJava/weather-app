const express = require('express')
const router = express.Router()

router.get('/', (req, res ) => res.send('Weather route'))

module.exports = router