import "@babel/polyfill";
import encrypt from '../api/utils/encrypt';
const spawn = require('child_process').spawn;
const { exec } = require('child_process');


const DATA = 'msg to encrypt';
describe('SHA256 encyption method test', () => {
    it('Should return a hash string', () => {
        expect(typeof encrypt( DATA )).toBe('string');
    });

    it('Hash should be 64 charechters long', () => {
        expect(encrypt( DATA ).length).toEqual(64);
    });
    
    it('Hash should match command line shasum \n    (shasum tested on mac and ubuntu) ', async () => {
        //comparing shasum command to node crypto module with sha256 algorithem.
        const execPromise = () => {
            return ( new Promise(( resolve, reject ) => {
                exec('printf "%s" "msg to encrypt" | shasum -a 256', (error, stdout) => {
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
        expect(encrypt( DATA )).toEqual(echo);
        
    });

    it('Hash should return null on an empty string', async () => {
        //comparing shasum command to node crypto module with sha256 algorithem.
        expect(encrypt( '' )).toEqual( null );
        
    });
});
