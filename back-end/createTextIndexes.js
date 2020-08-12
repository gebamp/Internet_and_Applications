const MongoClient = require('mongodb').MongoClient;
const process = require('process');
require('dotenv').config();

const URI = process.env.mongoURI;
const dbName = process.env.db_name;

console.log(URI);
const client = new MongoClient(URI, { useUnifiedTopology: true });


client.connect(async function (err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    console.log('Creating Text Indexes, this may take a while...');

    try {
        var stdout = await db.collection('papers').createIndex({ "metadata.title": "text", "metadata.abstract": "text" });
        console.log(stdout);
        stdout = await db.collection('metadata').createIndex({ "sha": 1, "pmcid": 1 });
        console.log(stdout);
        console.log('Succesfully Created Text Search Indexes!');
        process.exit();
    }
    catch (err) {
        throw err;
    }
});
