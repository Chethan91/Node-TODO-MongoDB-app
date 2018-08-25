var {mongoose} = require('../db/mongoose');

var User = mongoose.model('user', {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 5
    }
});

module.exports = {User};
