const express = require('express');
const nunjucks = require('nunjucks');

//grab database
const db = require('./database/db');

const server = express();

//configure public folder
server.use(express.static('public'));
//enable req.body use
server.use(express.urlencoded({ extended: true }))

//template engine
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index.html')
});

server.get('/create-point', (req, res) => {

    // console.log(req.query)

    return res.render('create-point.html')
});

server.post('/savepoint', (req, res) => {

    //insert data on databse
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            //Create page error and redirect to /create-point like Registration sucess-> point-created.html
            //Error simulation 'INSERT INT places'
            return res.render('create-point.html', { error: true })
        }

        console.log('Registado com sucesso')
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get('/search', (req, res) => {   

    const search = req.query.search

    if(search == '') {
        return res.render('search-results.html', { total: 0 });
    }



    //Grab data from database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length;

        return res.render('search-results.html', { places: rows, total });
    })
})

server.listen(3000)