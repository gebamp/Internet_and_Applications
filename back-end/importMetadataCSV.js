var { exec } = require('child_process');
const util = require('util');
exec = util.promisify(exec);
const process = require('process');
const path = require('path');

require('dotenv').config();

async function importCSV()
{
    const command = `mongoimport -d ${process.env.db_name} -c metadata --type csv --file ${path.join(process.env.base,'metadata.csv')} --headerline`;
    try {
        console.log('Importing CSV this may take a while...');
        await exec(command);
        console.log('Done importing metadata CSV');
        process.exit();
    }
    catch(err){
        throw err;
    }
}


importCSV();
