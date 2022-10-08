 const db = require('../models/index')
 const User = db.users

 exports.addData = (req, res) => {
    User.updateOne(
        { "_id":req.body.user_id },
        { $push: { data : {
            fullDate: Date.now(),
            date: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            weight: req.body.weight,
            height: req.body.height,
            status_h: req.body.status_h,
            status_w: req.body.status_w,
            status_a: req.body.status_a
        } } }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while add weight"
        })
    }) 
 }

 exports.deleteData = (req, res) => {
    req.body.user_id && req.body.data_id ?
    User.updateOne(
        { "_id":req.body.user_id},
        { $pull : { data: {_id: req.body.data_id}} }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update data"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

