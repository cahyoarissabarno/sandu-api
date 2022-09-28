module.exports = (app) => {
    const users = require('../controllers/user.controller')
    const weight = require('../controllers/weight.controller')
    const height = require('../controllers/height.controller')
    const router = require('express').Router()

    router.get('/:id', users.getUser)
    router.get('/all', users.getAllUser)
    router.get('/login/:nik', users.getUserByNik)
    router.post('/', users.addUser)
    router.put('/', users.updateUser)
    router.delete('/', users.deleteUser)

    router.get('/weight/:id', weight.getWeight)
    router.post('/weight', weight.addWeight)
    router.put('/weight', weight.updateWeight)
    router.patch('/weight', weight.deleteWeight)

    router.get('/height/:id', height.getHeight)
    router.post('/height', height.addHeight)
    router.put('/height', height.updateHeight)
    router.patch('/height', height.deleteHeight)

    app.use('/api/users', router)
}