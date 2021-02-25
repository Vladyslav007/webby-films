const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    fullName: {type: String, require: true},
    idFilm: [{type: Types.ObjectId, ref: 'Film'}]
})

module.exports = model('Star', schema)