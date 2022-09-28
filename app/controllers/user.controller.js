 const db = require('../models/index')
 const User = db.users

 exports.addUser = (req, res)=>{
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

 exports.updateUser = (req, res)=>{
    User.updateOne(
        { _id: req.body.user_id },
        {
          $set: {
            childs_name: req.body.childs_name,
            childs_birth: req.body.childs_birth, // tambahan
            parents_name: req.body.parents_name,
            parents_phone: req.body.parents_phone, // tambahan
            childs_nik: req.body.childs_nik,
            address: req.body.address,
            posyandu_name: req.body.posyandu_name,
            posyandu_address: req.body.posyandu_address,
          }
        }
     )
     .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update user"
        })
    });
 }

 exports.getUser = (req, res) => {
    User.find({_id: req.body.user_id})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while user"
        })
    })
 }

 exports.getUserByNik = (req, res) => {
    User.find({childs_nik: req.body.childs_nik}, {weight:0, height:0})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while login"
        })
    })
 }

 exports.getAllUser = (req, res) => {
    User.find({})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while get all user"
        })
    })
 }

 exports.deleteUser = (req, res) => {
    User.deleteOne({"_id": req.body.user_id})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while delete user"
        })
    })
 }

