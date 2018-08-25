const mongoose = require('mongoose');

const schema = mongoose.Schema;
const url = 'mongodb://127.0.0.1:27017/TodoApp';

mongoose.connect(url);

module.exports = {mongoose};