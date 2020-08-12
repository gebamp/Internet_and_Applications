const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 8765;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

const MongoClient = require('mongodb').MongoClient;
const URI = process.env.mongoURI;
const client = new MongoClient(URI, { useUnifiedTopology: true });


client.connect((err)=>{
    if(err) throw err;
    console.log('Connected to Database')
    global.dbClient = client;
})





const AuthorRouter = require('./routes/authors');

app.use('/authors', AuthorRouter);





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


