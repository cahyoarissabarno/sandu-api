module.exports = (app) => {
    const kader = require('../controllers/kader.controller')
    const router = require('express').Router()

    router.post('/', kader.addKader)
    router.post('/login', kader.login)

    app.use('/api/kader', router)
}