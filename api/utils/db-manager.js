/* eslint-disable no-console */
// ## mongoDB atlas cluster manager
// ## methods:
// ##   insert => excepts a hash and message and inserts them as a key:value pair
// ##   

const MongoClient = require('mongodb').MongoClient;
import {mongoUser, mongoPass} from '../../config';
const URL = `mongodb+srv://${mongoUser}:${mongoPass}@sandbox-l30bx.mongodb.net/`;

const insert = async ( hash, msg, next ) => {
    try{
        // connect to mongo client (v4.0.9).
        const client = new MongoClient(URL, { useNewUrlParser: true });
        const _client = await client.connect();
        const collection = _client.db('hash-service').collection('messages');
        const data = {[hash]: [msg]};
            
        // check if hash is already in db.
        let documents = 
            await collection
                .find( {[hash]: {$exists: true}} )
                .toArray();
        
        // if so, add to db.
        if (documents.length === 0){
            await collection.insertOne( data );
            _client.close(true);
            return true;
        } else {
            console.log('document exists');
            _client.close(true);
            return false;
        }

    } catch (err){
        next(err);
    }
    
};

const getHash = async ( hash, next ) => {
    try{
        // connect to mongo client (v4.0.9).
        const client = new MongoClient(URL, { useNewUrlParser: true });
        const _client = await client.connect();
        const collection = _client.db('hash-service').collection('messages');

        // check if hash has been added to db.
        const data = 
        await collection
            .find( {[hash]: {$exists: true}} )
            .toArray();
        _client.close(true);
                
        // if so, return value (original msg).
        if (data.length !== 0){
            console.log('hash exists');
            const msg = data[0][hash].toString();
            console.log(msg);
            return msg;
        } else {
            console.log('hash doesnt exist');
            return null;
        }
    }
    catch (err){
        next(err);
    }
};

// eslint-disable-next-line no-unused-vars
const errorPipe = ( err ) => {
    console.log(err);
    // next
    throw err;
};  

module.exports = {
    insert: insert,
    getHash: getHash
};