const MongoClient = require('mongodb').MongoClient;
import {mongoUser, mongoPass} from '../../config';
const test = require('assert');

console.log('in db module');
console.log('mongo user', mongoUser);

const insert = ( hash, msg ) => {
    const URL = `mongodb+srv://${mongoUser}:${mongoPass}@sandbox-l30bx.mongodb.net/?`;
    const client = new MongoClient(URL, { useNewUrlParser: true });
    client.connect( async (err, _client) => {

        // if (err) throw (err);
    try {
        const collection = _client.db("hash-service").collection("messages");
        const data = {};
        data[hash] = msg;
            let documents = collection.find( data )
                .toArray()
                .then(()=>{
                    if (documents.length === 0){
                        collection.insertOne( data );
       
                   } else {
                       console.log('document exists');
                   }
                   _client.close(true);
                })
                .catch((err) => console.log);

    } catch (err){
        _client.close(true);
        throw err;
    }
      });
    
}


/// alternative connection
//
// const client = new MongoClient(uri, { useNewUrlParser: true });

// const insert = async ( hash, msg ) => {
//     client.connect(async (err) => {
//     // if (err) throw (err);
// try {
//     const collection = client.db("hash-service").collection("messages");
//     const data = {};
//     data[hash] = msg;
//         let documents = collection.find( data ).toArray().catch((err) => console.log);
//         if (documents.length === 0){
//              collection.insertOne( data );

//         } else {
//             console.log('document exists');
//         }
//     client.close(true);
// } catch (err){
//     client.close(true);
//     throw err;
// }
//   });

// }
module.exports = {
    insert: insert
}