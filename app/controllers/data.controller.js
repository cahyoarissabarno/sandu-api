 const db = require('../models/index')
 const User = db.users

 exports.addData = async (req, res) => {
    const isFind = await User.find({
        'data': { 
            $elemMatch: {
                date: new Date().getDate(),
                month: new Date().getMonth()+1,
                year: new Date().getFullYear(),
                // date: 21,
                // month: 10,
                // year: 2022
            }
        }, "_id":req.body.user_id
    }, { "data.$": 1})

    // res.send(isFind)
    console.log(isFind)

    if (isFind.length == 0) {
        User.updateOne(
            { "_id":req.body.user_id },
            { $push: { data: {
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
                message: err.message || "Error while add data"
            })
        }) 
    }

    if (isFind.length == 1) {
        // console.log(isFind[0].data[0]._id)
        User.updateOne(
            { "_id": req.body.user_id, "data._id": isFind[0].data[0]._id},
            { $set: { 
                "data.$.weight": req.body.weight,
                "data.$.height": req.body.height,
                "data.$.status_h": req.body.status_h,
                "data.$.status_w": req.body.status_w,
                "data.$.status_a": req.body.status_a
            } }
        )
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Error while update data"
            })
        })
    }
    
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

