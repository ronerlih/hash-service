import config from './config.js';
import apiRouter from './api';
import serverRender from './serverRender';
import express from 'express';

const server = express();
server.use( express.json() );       // to support JSON-encoded bodies
server.use( express.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

server.set('view engine', 'ejs');

server.get(['/'], (req, res) => {
    serverRender()
    .then(({ initialMarkup, initialData }) => {
        res.render('index', {
            initialMarkup,
            initialData
        });
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

server.use('/api', apiRouter);
server.use(express.static('public'));
// server.use(errorHandler);

// eslint-disable-next-line no-unused-vars
// function errorHandler (err, req, res, next) {
//     res.status(500);
//     res.render('error', { error: err });
// }

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});

export default server;