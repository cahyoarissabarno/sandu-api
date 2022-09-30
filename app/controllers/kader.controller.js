const db = require('../models/index')
const Kader = db.kader

const bcrypt = require('bcrypt');

exports.addKader = (req, res)=>{
   const kader = new Kader({
       username: req.body.username,
       password: bcrypt.hashSync(req.body.password, 10)
   })

   kader.save(kader)
   .then((result) => {
       res.send(result)
   }).catch((err) => {
       res.status(409).send({
           message: err.message || "Error while create user"
       })
   });
}

exports.login = (req, res)=>{
    Kader.find({username: req.body.username})
    .then((result) => {
        const passCheck = bcrypt.compareSync(req.body.password, result[0].password)
        if(passCheck){
            res.send({status: "Authorized", id:result[0]._id})
        }else{
            res.status(409).send({
                message: "Password Salah"
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Login gagal, pastikan username benar"
        })
    })
 }
