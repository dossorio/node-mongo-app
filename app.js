import http from 'http';
import express from 'express';
import mongodb from 'mongodb';
import assert from 'assert';

const MongoClient = mongodb.MongoClient;
const app = express();
let db = null;
const PORT = 8000;

app.get('/', (req, res) => {
	res.writeHead(200, {'content-type': 'text/plain'});

	db.collection('names').find({}).toArray()
		.then((names) => {
			names.forEach((name) => {
				res.write(`Name: ${name.name}\n`);
			});
			res.end('\nThat was all!');
		});
});

MongoClient.connect('mongodb://localhost:27017/test', (err, dbConn) => {
	assert.equal(null, err);

	db = dbConn;
	console.log('Connected to mongodb');

	app.listen(PORT);
	console.log(`Server running at http://localhost:${PORT}`);
});