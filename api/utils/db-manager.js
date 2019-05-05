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
        const collection = await _client.db("hash-service").collection("messages");
        
        const data = {};
        data[hash] = msg;
        // let documents = await collection.find( data ).toArray();
        let documents = await collection.find( {[hash]: {$exists: true}} ).toArray();
        console.log('documents.length', documents.length);
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