 const db = require('../models/index')
 const User = db.users

 exports.findAll = (req, res)=>{
    User.find()
    .then((result) => {
        res.send(result)    
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error ocured"
        })
    });
 }

 exports.create = (req, res)=>{
    const user = new User({
        childs_name: req.body.childs_name,
        childs_birth: req.body.childs_birth, // tambahan
        parents_name: req.body.parents_name,
        parents_phone: req.body.parents_phone, // tambahan
        childs_nik: req.body.childs_nik,
        address: req.body.address,
        posyandu_name: req.body.posyandu_name,
        posyandu_address: req.body.posyandu_address,
        weight:[],
        height:[]
    })

    user.save(user)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while create user"
        })
    });
 }

 exports.addWeight = (req, res) => {
    User.updateOne(
        { "_id":req.body.id },
        { $push: { weight : {
            fullDate: Date.now(),
            date: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            value: req.body.value,
        } } }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while add weight"
        })
    });
 }