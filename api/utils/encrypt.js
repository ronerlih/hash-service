'use strict';
import crypto from 'crypto';

const encrypt = ( str ) => {
    // encryption using node built-in model (crypto)
    // https://stackoverflow.com/questions/19236327/nodejs-sha256-password-encryption
    
    // return null to process if empty string
    if ( str === '') return null;
    
    // limit to 1024 characters, user recieves turnicated unencrypted msg.
    if (str.length > Math.pow(2, 10)) return str.substring(0, 1024);

    const hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash;
};

export default encrypt;
