 const db = require('../models/index')
 const User = db.users

 exports.addUser = (req, res)=>{
    const user = new User({
        childs_name: req.body.childs_name,
        childs_birth: req.body.childs_birth, // tambahan
        parents_name: req.body.parents_name,
        parents_phone: req.body.parents_phone, // tambahan
        childs_nik: req.body.childs_nik,
        // address: req.body.address,
        // posyandu_name: req.body.posyandu_name,
        // posyandu_address: req.body.posyandu_address,
        weight:[],
        height:[]
    })

    user.save(user)
    .then((result) => {
        res.send({status: 'success'})
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
            // address: req.body.address,
            // posyandu_name: req.body.posyandu_name,
            // posyandu_address: req.body.posyandu_address,
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
    const { id } = req.params
    User.find({_id: id})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while user"
        })
    })
 }

 exports.getUserByNik = (req, res) => {
    const { nik } = req.params
    User.find({childs_nik: nik}, {weight:0, height:0})
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

 exports.getAge = (req, res) => {
    console.log(new Date(2022, 11-1, 10).getTime()) // y-m-d convert birth input to milis
    const dateNow = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate()).getTime()
    Math.round((((dateNow - 1662314400000)/2678400000) + Number.EPSILON) * 10) / 10
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

