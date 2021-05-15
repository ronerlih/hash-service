/* eslint-disable no-console */
import express from 'express';
import encrypt from './utils/encrypt';
import {insert, getHash} from './utils/db-manager';

const router = express.Router();

//initial data
router.get('/initial-data', async (req, res, next) => {
    try {
        const initialData = {headline: 'Welcome to Encryption/Decription service useing SHA256 hashing algorithem',
            data: 'initial data'};
        res.send(initialData);
    }
    catch (err) {
        next(err);
    }
});

//encrypt route
router.post('/messages', async (req, res, next) => {
    try {
        console.log(req.body);
        const msg = req.body.message;
        const encription = await encrypt( msg );
        // return bad requst on empty string.
        if ( encription === null) 
            res.status(400)
                .send('Empty message, please supply a text to encrypt');
        // return method not allowed on strings longer than 1024.
        if ( encription.length >= 1024) 
            res.status(405)
                .send({
                    response: 'Message is longer than 1024 characters, please split your message or turnicate it.',
                    turnicatedMessage: encription
                });
        
        const docInserted = await insert ( encription, msg );
        docInserted
        ? res.send({'digest': encription})
        // return method not allowed.
        : res.status(405).send('msg already exists!');}
    catch (err) {
        next(err);
    }
});

//decryption route
router.get('/messages/:hash', async (req, res, next) => {
    try {
        const originalMsg = await getHash ( req.params.hash, next );
        originalMsg
          ? res.send({'message':  originalMsg})
          : res.status(404).send('hash does not exists');
    }
    catch (err) {
        next(err);
    }
});

export default router;
