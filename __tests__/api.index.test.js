// # integration test:
// # testing GET and POST
// # TO_DO: 
// #    Mocks - responses, db, methods
// #    Load tests suggestion: https://artillery.io/

'use strict';
import '@babel/polyfill';
const request = require('supertest');
import app from '../server';
const { exec } = require('child_process');
const RANDOM_STR = randomString(50);

describe('api POST request tests', () => {
    
    it('on new msg sould return sha 256 hash (64 characters long)', async () => {
        // generate a random string to test
        console.log('unicode random test msg:\n',RANDOM_STR);
        // get hash for new string
        const execPromise = () => {
            return ( new Promise(( resolve, reject ) => {
                exec(`curl -X POST -H "Content-Type: application/json" -d '{"message": "${RANDOM_STR}" }' http://127.0.0.1:8080/api/messages`, 
                    (error, stdout) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            reject(error);
                        }
                        // parse result and get length
                        resolve(JSON.parse(stdout));
                    });
                }));
        };
        let numberOfChars = await execPromise();
        numberOfChars = numberOfChars.digest.toString().length;
        expect( numberOfChars ).toBe(64);
    });
    
    it('on existing msg should return 405 method not alllowed', async () => {
        // get hash for new string
        const execPromise = () => {
            return ( new Promise(( resolve, reject ) => {
                exec(`curl -X POST -H "Content-Type: application/json" -d '{"message": "${RANDOM_STR}" }' -s -o /dev/null  -w  "%{http_code}" http://127.0.0.1:8080/api/messages`, 
                    (error, stdout) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            reject(error);
                        }
                        // parse result and get length
                        console.log('status code', stdout)
                        resolve(stdout);
                    });
                }));
        };
        
        let statusCode = await execPromise();
        expect( statusCode ).toBe("405");
    });
    

});

describe('API GET request tests', () => {
    test('If no hash provided, server should respond with a 404 code', (done) => {
        request(app).get('/api/messages').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("If hash doesn't correspond to key, server should respond with a 404 code", (done) => {
        const reqUrl = '/api/messages/' + '46ea2ff96000ba7ea662649b94db605d90db33c6f4d461ca77e95fc6fe201260';
        request(app).get(reqUrl).then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("If hash matches key, server should return decrypted message ('foo')", (done) => {
        const FOO_HASH = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
        const reqUrl = '/api/messages/' + FOO_HASH;
        request(app).get(reqUrl).then((response) => {
            expect(response.body.message).toBe("foo");
            done();
        });
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