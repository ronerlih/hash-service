/* eslint-disable no-console */
import express from 'express';
import encrypt from './utils/encrypt';
import {insert, getHash} from './utils/db-manager';
import assert from 'assert';

const router = express.Router();

//encrypt route
router.post('/messages', async (req, res, next) => {
    try {
        const msg = req.body.message;
        const encription = await encrypt( msg );
        // return bad requst on empty string.
        if ( encription === null) res.status(400).send('Empty message, please supply a text to encrypt');
        const docInserted = await insert ( encription, msg );
        console.log('hash: ', encription);
        docInserted
        ? res.send({'digest': encription})
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
