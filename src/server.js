const express = require('express');
const nunjucks = require('nunjucks');

//grab database
const db = require('./database/db');

const server = express();

//configure public folder
server.use(express.static('public'));

//template engine
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index.html')
});

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
});

server.get('/search', (req, res) => {
    return res.render('search-results.html')
})

server.listen(3000)