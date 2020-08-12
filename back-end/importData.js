const csv = require('csv-parser')
const fs = require('graceful-fs');
const process = require('process');
const path = require('path');
var { exec } = require('child_process');
const util = require('util');
const asyncPool = require('tiny-async-pool');

exec = util.promisify(exec);
require('dotenv').config();


async function importData(files) {
    var i = 1;
    await asyncPool(16, files, (file) => {
        return new Promise(async (resolve, reject) => {
            const command = `mongoimport --db ${process.env.db_name} --collection papers --file ${file}`;
            try {
                await exec(command);
                console.log(i + '/' + files.length);
                i++;
                resolve();
            }
            catch (err) {
                reject(err);
            }
        })
    });

    process.exit();
}



var files = [];
var i = 0;

const baseFilePath = process.env.base

fs.createReadStream(path.join(baseFilePath, 'metadata.csv'))
    .pipe(csv())
    .on('data', function (row) {
        if (row['pdf_json_files'] || row['pmc_json_files']) {
            const file = (row['pdf_json_files']) ? (row['pdf_json_files']) : (row['pmc_json_files']);
            for (f of file.split(';'));
            files.push(path.join(baseFilePath, f.trim()));
        }
    })
    .on('end', function () {
        console.log('Importing ' + files.length + ' json files to MongoDB database');
        importData(files);
    })









