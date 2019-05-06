// # testing db functions
// # TO-DO: add a seperate tests collection on mongo.

// 'use strict';
import "@babel/polyfill";
import encrypt from '../api/utils/encrypt';
import {connectToAtlas, insert, getHash} from '../api/utils/db-manager';
const RANDOM_STR = randomString(100);
const INSERTED_RANDOM_STR = randomString(100);
const NEW_DATA = [encrypt (RANDOM_STR), RANDOM_STR ];
const INSERTED_DATA = [encrypt (RANDOM_STR), INSERTED_RANDOM_STR, null ];


describe('test insert method (with atlas mongodb)', () => {

    it('Should return true on a new msg', async () => {
        expect( await insert( NEW_DATA )).toBe(true);
    });

    it('Should return false on existing msg', async () => {
        await insert(...INSERTED_DATA);
        expect( await insert( ( INSERTED_DATA[0], INSERTED_DATA[1], null ))).toBe(false);
        // TO-DO: delete record after testing.
    });
    
    it('Should return false on empty args', async () => {
        expect( await insert()).toBe(false);
        // TO-DO: delete record after testing.
    });

    it('Should return false on empty args', async () => {
        expect( await insert()).toBe(false);
        // TO-DO: delete record after testing.
    });


});

describe('test getHash method (with atlas mongodb)', () => {
    
    it('Should return true on a new msg', async () => {
        const hash = await getHash( INSERTED_DATA[0] );
        expect( hash.substring(1, -1) ).toEqual( INSERTED_DATA[1].substring(1, -1));
    });
});

function randomString(length) {
    let result = '';
    for(let i=0; i< length; i++) {
        // add character according to cahrCode, aoive first 200 chars since many escape on printf command.
        // TO-DO: tight avoiding characters according to specific ranges and characters.
        result += String.fromCharCode(200 + Math.floor(Math.random() * 65334 ));
    }
    return result;
 }