const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, require: true},
    idFilm: {type: Types.ObjectId, ref: 'Film'}
})

module.exports = model('Format', schema)