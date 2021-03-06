import config from './config';
import apiRouter from './api';
import serverRender from './serverRender';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use( bodyParser.json() );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
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