//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/TodoApp';

//var id = new ObjectID();
//console.log(id);

MongoClient.connect(url, (err, client) => {

  if(err) console.log('Error ');
  console.log('Connected successfully.');
  var db = client.db('test');

  // insertion
  // db.collection('Todos').insertOne({
  //   text: 'Do Something',
  //   completed: false
  // }, (err, result) => {
  //   if(err) console.log('Unable to insert Todos. ', err);

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // fetching
  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log(docs);
  // }, (err) => {
  //   console.log(err);
  // });

  //  db.collection('Todos').find({ text: 'Create new Mongo-db project'}).toArray().then((docs) => {
  //    console.log(docs);
  //  }, (err) => {
  //     console.log(err);
  //  });

  // count
  db.collection('Todos').find().count().then((count) => {
    console.log('Todos count :', count);
  }, (err) => {
     console.log(err);
  });

  //console.log(db);
  client.close();
});