/* eslint-disable no-console */
// ## mongoDB atlas cluster manager
// ## methods:
// ##   insert => excepts (hash, originalMessage, next-middelware-pipeline) and inserts hash:originalMessage as a key:value pair,
// ##       return true if inserted, false if not, pipes errors to express err middleware.
// ##   getHash => excepts ( hash, next-middelware-pipeline), check DB for the hash key, 
// ##       return msg if exists or null if it doesn't. pipes errors to express err middleware.
const MongoClient = require('mongodb').MongoClient;
import {mongoUser, mongoPass} from '../../config';
// atlas mongodb
// const URL = `mongodb+srv://${mongoUser}:${mongoPass}@sandbox-l30bx.mongodb.net/`;
const URL = `mongodb://<${mongoUser}>:<${mongoPass}>@ds249717.mlab.com:49717/heroku_gbm00h75`

const connectToAtlas = async () => {
    // connect to atlas mongo client (v4.0.9).
    const client = new MongoClient(URL, { useNewUrlParser: true });
    const connectedClient = await client.connect();
    const db = await connectedClient.db('hash-service');
    return [db, connectedClient];
};

const insert = async ( hash, msg, next ) => {
    try{
        const [db, client] = await connectToAtlas();
        const data = {[hash]: [msg]};
            
        // check if hash is already in db.
        let documents = 
            await db
                .collection('messages')
                .find( {[hash]: {$exists: true}} )
                .toArray();
        
        // if so, add to db.
        if (documents.length === 0){
            await db.collection('messages').insertOne( data );
            client.close(true);
            return true;
        } else {
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
        const [db, client] = await connectToAtlas();

        // return null if no hash
        if (!hash) return null;

        // check if hash has been added to db.
        const data = 
        await db
            .collection('messages')
            .find({[hash]: { $exists: true }})
            .toArray();
        client.close(true);
                
        // if so, return value (original msg).
        if (data.length !== 0){
            const msg = data[0][hash].toString();
            return msg;
        } else {
            // if no doc return null
            return null;
        }
    }
    catch (err){
        (next)
            ? next(err)
            // in testing
            : console.log(err);
    }
};

module.exports = {
    connectToAtlas: connectToAtlas,
    insert: insert,
    getHash: getHash
};