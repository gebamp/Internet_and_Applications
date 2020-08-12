require('dotenv').config();

const dbName = process.env.db_name;

function test(drug, disease, res) {
    const db = global.dbClient.db(dbName);
    const pipeline = [
        {
            $match:
            {
                '$text': { '$search': `\"${drug}\" \"${disease}\"` }
            }
        },
        {
            $unwind: '$metadata.authors'
        },
        {
            $group:
            {
                _id: {
                    lastName: "$metadata.authors.last",
                    middleName: "$metadata.authors.middle",
                    firstName: "$metadata.authors.first"
                },
                papers:
                {
                    $push:
                    {
                        title: "$metadata.title", id: '$paper_id'
                    }
                },
                count:
                {
                    $sum: 1
                }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 10
        }
    ]

    db.collection('papers', (err, collection) => {
        if (err) throw err;
        collection.aggregate(pipeline).
            toArray(
                (err, authors) => {
                    if (err) throw err;
                    addJournals(authors, res);
                }
            )
    })
}



async function addJournals(authors, res) 
{
    const db = global.dbClient.db(dbName);
    db.collection('metadata', async (err, collection) => {
        if (err) throw err;


        Promise.all(authors.map(author=>{
            return new Promise((resolve,reject)=>{
                Promise.all(author.papers.map(paper => {
                    return new Promise((resolve, reject) => {
                        collection.findOne({ $or: [{ sha: paper.id }, { pmcid: paper.id }] }, (err, metadata) => {
                            if (err) reject(err);
                            if (typeof metadata !== 'undefined' && metadata)
                                paper['journal'] = metadata.journal;
                            else
                                paper['journal'] = '';
                            resolve(paper)
                        })
                    })
                }))
                .then(papers=>{
                    author['papers'] = papers;
                    resolve(author);
                })
                .catch(err=>reject(err));
            })
        }))
        .then(x=>{
            res.status(200).json(x);
        });

    })
}


module.exports.test = test;