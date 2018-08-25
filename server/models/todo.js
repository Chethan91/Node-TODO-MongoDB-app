var {mongoose} = require('../db/mongoose');

var Todo = mongoose.model('todo', {
    text: {
        type: String,
        require: true
    }
});

module.exports = {Todo};