//import sqlite3 dependecy
const sqlite3 = require('sqlite3').verbose();

//create object that will make the operations on database
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

// db.serialize( () => {
    // w/ SQL commands
    
    // // create table,
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // //insert data on table
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80",
    //     "Papersider",
    //     "Guilherme Gembala, Jardim América",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Paper and Cardboard"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Registado com sucesso')
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)
    
    // // consult data
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Here's your data:")
    //     console.log(rows)
    // })

    // // delete data
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(`Register deleted successfully`)
    // })

// })