// ## mongoDB atlas cluster manager
// ## methods:
// ##   insert => excepts a hash and message and inserts them as a key:value pair
// ##   

const MongoClient = require('mongodb').MongoClient;
import {mongoUser, mongoPass} from '../../config';

const insert = ( hash, msg ) => {
    // connect to mongo client (v4.0.9).
    const URL = `mongodb+srv://${mongoUser}:${mongoPass}@sandbox-l30bx.mongodb.net/?`;
    const client = new MongoClient(URL, { useNewUrlParser: true });
    client.connect( async (err, _client) => {
        if (err) throw (err);
        try {
            const collection = await _client.db("hash-service").collection("messages");
            const data = {[hash]: [msg]};
            
            // check if hash is already in db.
            let documents = await collection.find( {[hash]: {$exists: true}} ).toArray();
            // if so, add to db.
            if (documents.length === 0){
                await collection.insertOne( data );
                _client.close(true);
            } else {
                console.log('document exists');
                _client.close(true);
            }
        } catch (err){
            errorPipe(err);
        }
    });
    
}

const errorPipe = ( err ) => {
    console.log(err);
    _client.close(true);
    throw err;
}  

module.exports = {
    insert: insert
}