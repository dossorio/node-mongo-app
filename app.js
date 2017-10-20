import express from 'express';
import mongodb from 'mongodb';
import assert from 'assert';
import cons from 'consolidate';

const MongoClient = mongodb.MongoClient;
const app = express();
let db = null;
const PORT = 8000;

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
	db.collection('names').find({}).toArray()
		.then((names) => {
			res.render('index', { names: names });
		});
});

app.use((req, res) => {
	res.sendStatus(404);
});

MongoClient.connect('mongodb://localhost:27017/test', (err, dbConn) => {
	assert.equal(null, err);

	db = dbConn;
	console.log('Connected to mongodb');

	app.listen(PORT);
	console.log(`Server running at http://localhost:${PORT}`);
});