const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: { type: String, require: true },
    releaseYear: { type: Number, require: true, min: 1895, max: new Date().getFullYear() },
    // stars: [{ type: Types.ObjectId, ref: 'Star', require: true }],
    // format: { type: Types.ObjectId, ref: 'Format', require: true }
    stars: [{ type: String, require: true }],
    format: { type: String, require: true }
})

module.exports = model('Film', schema)