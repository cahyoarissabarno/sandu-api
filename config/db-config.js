require('dotenv').config()

module.exports = {
    url : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandu.eytjed1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
}