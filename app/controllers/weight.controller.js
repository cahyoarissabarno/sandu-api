 const db = require('../models/index')
 const User = db.users

 exports.getWeight = (req, res) => {
    req.body.user_id ? User.find({_id: req.body.user_id}, {weight:1}).limit(1)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while get weight"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

 exports.addWeight = (req, res) => {
    req.body.user_id && req.body.value ? User.updateOne(
        { "_id":req.body.user_id },
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
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

 exports.updateWeight = (req, res) => {
    req.body.user_id && req.body.weight_id && req.body.fullDate && req.body.date && req.body.month && req.body.year && req.body.value ?
    User.updateOne(
        { "_id":req.body.user_id, "weight._id": req.body.weight_id },
        { $set: {
            "weight.$.fullDate": req.body.fullDate,
            "weight.$.date": req.body.date,
            "weight.$.month": req.body.month,
            "weight.$.year": req.body.year,
            "weight.$.value": req.body.value,
        } }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update weight"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

 exports.deleteWeight = (req, res) => {
    req.body.user_id && req.body.weight_id ?
    User.updateOne(
        { "_id":req.body.user_id},
        { $pull : { weight: {_id: req.body.weight_id}} }
    )
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error while update weight"
        })
    }) : res.status(409).send({
        message: "Input Invalid"
    })
 }

