'use strict';
import crypto from 'crypto';

const encrypt = ( str ) => {
    // encryption using node built-in model (crypto)
    // https://stackoverflow.com/questions/19236327/nodejs-sha256-password-encryption
    if ( str === '') return null;

    const hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash;
};

export default encrypt;
