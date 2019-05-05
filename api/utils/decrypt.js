'use strict';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const password = 'sadff';

const decrypt = ( hash ) => {
    // decryption using node built-in model (crypto)
    // https://lollyrock.com/posts/nodejs-encryption/
    // const hash = crypto.createHash('sha256').update(str).digest('hex');

    var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;

    return hash;
}

export default decrypt;