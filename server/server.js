const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started on port - ${port}`);
});

app.post('/todos', (req, res) => {
    console.log('testing req - data');
    console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });
  
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/todos', (req, res) => {
    Todo.find().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(e);
    });
  });

  app.get('/todos/:id', (req, res) => {
      var id = req.params.id;

      if(!ObjectID.isValid(id)) {
          return res.status(404).send();
      }

      Todo.findById(id).then((doc) => {
          if(!doc) 
            res.status(404).send();
          
          res.send(doc);  
      }).catch((e) => {
        res.status(400).send(err);
      });
  });

  app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) 
      return res.status(404).send();

    Todo.findByIdAndRemove(id).then((doc) => {
      if(!doc)
        res.status(404).send();

      res.send(doc);
    }).catch((e) => {
      res.status(400).send(err);
    });
  });

  app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) 
      return res.status(404).send();

    if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }

      res.send(todo);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });

//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

// var user = new User({
//     name: 'Chethan',
//     email: 'chethan@gmail.com'
// });

// user.save().then((docs) => {
//     console.log('Saved succesfully.');
//     console.log(docs);
// }, (e) => {
//     console.log('Unable to save', e._message);
// });