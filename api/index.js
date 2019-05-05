import express from 'express';
import encrypt from './utils/encrypt';
import {insert} from './utils/db-manager';

import decrypt from './utils/decrypt';
const router = express.Router();

//encrypt route
router.post('/messages', async (req, res) => {
  const msg = req.body.message;
  const encription = await encrypt( msg );
  insert ( encription, msg );
  console.log('hash: ', encription);
  res.send({"digest": encription});
});

//decrypt route
router.get('/messages/:hash', (req, res) => {

  res.send('hash route ' + req.params.hash);
});

export default router;
