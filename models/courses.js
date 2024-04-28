const db = require('../db')

const Course = db.model("Course", {
    name: {type: String, required: true},
    dept: {String},
    desc: {String}, 
})

module.exports = Course