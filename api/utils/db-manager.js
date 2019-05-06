/* eslint-disable no-console */
// ## mongoDB atlas cluster manager
// ## methods:
// ##   insert => excepts (hash, originalMessage, next-middelware-pipeline) and inserts hash:originalMessage as a key:value pair,
// ##       return true if inserted, false if not, pipes errors to express err middleware.
// ##   getHash => excepts ( hash, next-middelware-pipeline), check DB for the hash key, 
// ##       return msg if exists or null if it doesn't. pipes errors to express err middleware.
const MongoClient = require('mongodb').MongoClient;
import {mongoUser, mongoPass} from '../../config';
const URL = `mongodb+srv://${mongoUser}:${mongoPass}@sandbox-l30bx.mongodb.net/`;


const connectToAtlas = async () => {
    // connect to atlas mongo client (v4.0.9).
    const client = new MongoClient(URL, { useNewUrlParser: true });
    const connectedClient = await client.connect();
    const collection = await connectedClient.db('hash-service').collection('messages');
    return [collection, connectedClient];
}

const insert = async ( hash, msg, next ) => {
    try{
        const [collection, client] = await connectToAtlas();
        const data = {[hash]: [msg]};
            
        // check if hash is already in db.
        let documents = 
            await collection
                .find( {[hash]: {$exists: true}} )
                .toArray();
        
        // if so, add to db.
        if (documents.length === 0){
            await collection.insertOne( data );
            client.close(true);
            return true;
        } else {
            console.log('document exists');
            client.close(true);
            return false;
        }

    } catch (err){
        (next)
            ? next(err)
            // in testing
            : console.log(err);
    }
};
const getHash = async ( hash, next ) => {
    try{
        const [collection, client] = await connectToAtlas();

        // check if hash has been added to db.
        const data = 
        await collection
            .find({[hash]: { $exists: true }})
            .toArray();
        client.close(true);
                
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

module.exports = {
    connectToAtlas: connectToAtlas,
    insert: insert,
    getHash: getHash
};