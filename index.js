const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6504373',
    password: '5uQ4JfFwjf',
    database: 'sql6504373',
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('database connection success');
    else
        console.log('database failed')
})

app.listen(8081, () => console.log('Express server start at 8081'));

//read
app.get('/list', (req, res) => {
    mysqlConnection.query('select * from employee', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows);
        }
        else
            console.log(err);
    })
});

//read
app.get('/list/:empId', (req, res) => {
    mysqlConnection.query('select * from employee where empId = ?', [req.params.empId] , (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows);
        }
        else
            console.log(err);
    })
});

//delete
app.delete('/delete/:empId', (req, res) => {
    mysqlConnection.query('delete from employee where empId = ?', [req.params.empId] , (err, rows, fields) => {
        if (!err) {
            res.send('deleted rows');
            console.log('deleted rows');
        }
        else
            console.log(err);
    })
});

//create
app.post('/create', (req, res) => {
    let reqBody = req.body;
    mysqlConnection.query('insert into employee values (?,?,?)', [reqBody.empId, reqBody.firstName, reqBody.lastName] , (err, rows, fields) => {
        if (!err) {
            res.send('values added');
            console.log('values added');
        }
        else
            console.log(err);
    })
});

//update
app.put('/update/:empId', (req, res) => {
    let reqBody = req.body;
    mysqlConnection.query('update employee set firstName = ?, lastName = ? where empId = ?', [reqBody.firstName, reqBody.lastName, req.params.empId] , (err, rows, fields) => {
        if (!err) {
            res.send('values updated');
            console.log('values updated');
        }
        else
            console.log(err);
    })
});