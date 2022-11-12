module.exports = (app) => {
    const users = require('../controllers/user.controller')
    const weight = require('../controllers/weight.controller')
    const height = require('../controllers/height.controller')
    const data = require('../controllers/data.controller')
    const router = require('express').Router()

    router.get('/', users.getAllUser)
    router.get('/id/:id', users.getUser)
    router.get('/login/:nik', users.getUserByNik)
    router.post('/', users.addUser)
    router.put('/', users.updateUser)
    router.delete('/', users.deleteUser)
    router.put('/softdel', users.softDelete)
    
    router.post('/data', data.addData)
    router.post('/data/delete', data.deleteData)


    // router.get('/weight/:id', weight.getWeight)
    // router.post('/weight', weight.addWeight)
    // router.put('/weight', weight.updateWeight)
    // router.patch('/weight', weight.deleteWeight)

    // router.get('/height/:id', height.getHeight)
    // router.post('/height', height.addHeight)
    // router.put('/height', height.updateHeight)
    // router.patch('/height', height.deleteHeight)

    app.use('/api/users', router)
}