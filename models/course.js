const db = require('../db')

const Course = db.model("Course", {
    name: {type: String, required: true},
    desc: {type: String}, 
    dept: {type: String}
})

module.exports = Course;