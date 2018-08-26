const mongoose = require('mongoose');

const schema = mongoose.Schema;
const url = 'mongodb://127.0.0.1:27017/TodoApp';

//const url = 'mongodb://test:test123@ds237967.mlab.com:37967/mytasklist_punk';

mongoose.connect(url);

module.exports = {mongoose};