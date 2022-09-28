 const db = require('../models/index')
 const User = db.users

 exports.getHeight = (req, res) => {
    const { id } = req.params
    User.find({_id: id}, {height:1}).limit(1)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while get height"
        })
    })
 }

 exports.addHeight = (req, res) => {
    req.body.user_id && req.body.value ? User.updateOne(
        { "_id":req.body.user_id },
        { $push: { height : {
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
            message: err.message || "Error while add height"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

 exports.updateHeight = (req, res) => {
    req.body.user_id && req.body.height_id && req.body.fullDate && req.body.date && req.body.month && req.body.year && req.body.value ?
    User.updateOne(
        { "_id":req.body.user_id, "height._id": req.body.height_id },
        { $set: {
            "height.$.fullDate": req.body.fullDate,
            "height.$.date": req.body.date,
            "height.$.month": req.body.month,
            "height.$.year": req.body.year,
            "height.$.value": req.body.value,
        } }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update height"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

 exports.deleteHeight = (req, res) => {
    req.body.user_id && req.body.height_id ?
    User.updateOne(
        { "_id":req.body.user_id},
        { $pull : { height: {_id: req.body.height_id}} }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update height"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

