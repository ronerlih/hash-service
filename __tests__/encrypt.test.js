'use strict';
import '@babel/polyfill';
import encrypt from '../api/utils/encrypt';
const { exec } = require('child_process');


const DATA = 'msg to encrypt';
describe('SHA256 encyption method test', () => {
    it('Should return a hash string', () => {
        expect(typeof encrypt( DATA )).toBe('string');
    });

    it('Hash should be 64 charechters long', () => {
        expect(encrypt( DATA ).length).toEqual(64);
    });
    
    it('Validate hash according to SHASUM command  \n    (shasum tested on mac and ubuntu) ', async () => {

        // generate a random string to test
        const RANDOM_STR = randomString(1023);
        console.log('unicode random string:\n',RANDOM_STR);
        //comparing shasum command to node crypto module with sha256 algorithem.
        const execPromise = () => {
            return ( new Promise(( resolve, reject ) => {
                exec(`printf "%s" ${RANDOM_STR} | shasum -a 256`, (error, stdout) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        reject(error);
                    }
                    //remove trailing charecters
                    resolve(stdout.substr(0, stdout.toString().length-4));
                });
            }));
        };

        const echo =  await execPromise();
        expect(encrypt( RANDOM_STR )).toEqual(echo);
        
    });

    it('Hash should return null on an empty string', async () => {
        //comparing shasum command to node crypto module with sha256 algorithem.
        expect(encrypt( '' )).toEqual( null );
        
    });

    it('Should turnicate at 1024 characters if string is longer', async () => {
        // generate a random string to test
        const LONG_STR = randomString(1050);
        expect(encrypt( LONG_STR ).length).toEqual( 1024 );
        
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
