require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = require('./app/models')
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('Database connected')
}).catch((err) => {
    console.log(`Cannot connect to the database `, err)
    process.exit()
});

app.get('/', (req, res)=>{
    res.json({
        message: 'welcome to sandu api'
    })
})

require('./app/routes/user.routes')(app)

app.listen(process.env.APP_PORT,()=>{
    console.log(`Server is running on ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})

