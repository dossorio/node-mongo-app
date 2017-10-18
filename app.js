import http from 'http';
import express from 'express';
import consolidate from 'consolidate';
import mongodb from 'mongodb';
import assert from 'assert';

const PORT = 8000;
const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
	assert.equal(null, err);
	console.log('Connected to mongodb');
	startHttpServer(db);
});

function startHttpServer(db) {
	let httpServer = http.createServer((req, res) => {
		res.writeHead(200, {'content-type': 'text/plain'});

		db.collection('names').find({}).toArray()
			.then((names) => {
				names.forEach((name) => {
					res.write(`Name: ${name.name}\n`);
				});

				res.end('\nThat was all!');
			}
		);
	});

	httpServer.listen(PORT);

	console.log(`Server running at http://localhost:${PORT}`);
}