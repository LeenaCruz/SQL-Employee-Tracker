const inquirer = require('inquirer');
const fs = require('fs');
const { Pool } = require('pg');
const {UpdateEmployee, ViewRoles, AddRole, ViewDepartments, ViewEmployees, AddDepartment} = require('./query.js')
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database 
const pool = new Pool(
 
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: 'localhost',
    },
    console.log('Conectado a la database')
)

function init (){
inquirer
.prompt( [
    { type: 'list',
        message: 'What would you like to do?',
        name: 'task',
        choices: ['Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],

    },
])
.then((response) => {
    console.log("Enhorabuena")

let query;
if (response.task === 'Update Employee Role') {
    console.log (`${response.task} funciono`)
    //update employee role in db
    //que tendria que hacer? mostrar db? escoger empleado? actualizar datos en db?
}
//ESTE SI FUNCIONA
else if (response.task === 'View All Roles'){
    const roles = new ViewRoles();
    query = roles.query();
    // console.log(query)
    pool.query(query, (error, results) => { if (error) {console.error(error);} console.log(results.rows)});
  init();
}
else if (response.task === 'Add Role') {
    console.log (`${response.task} funciono`)
    // inquirer.prompt([{type: 'input', message: 'Add role title', name: 'role'}, {type:'input', message:'Add salary', name: 'salary'},{type: 'input', message:'Add Department', name:'department'}]);
    const role = new AddRole();
    query = role.query();
    pool.query(query, (error, results) => { if (error) {console.error(error);} console.log(results.rows)});
}
else if (response.task === 'View All Departments') {
    // const depts = new ViewDepartments();
    // query = depts.query();
    // pool.query(query, (error, results) => { if (error) {console.error(error);} console.log(results.rows)});
    pool.query("SELECT * FROM department")
    .then(({rows}) => {
        console.table(rows);
        init();
    })
}
else if (response.task === 'Add Department') {
const dept = new AddDepartment();
query = dept.query();
pool.query(query, (error, results) => { if (error) {console.error(error);} console.log(results.rows)});
     
}
else if (response.task === 'View All Employees') {
    // console.log (`${response.task} funciono`)
    // const empl = new ViewEmployees();
    // query = empl.query();
    // pool.query(query, (error, results) => { if (error) {console.error(error);} console.log(results.rows)});
    pool.query("SELECT * FROM employee")
    .then(({rows}) => {
        console.table(rows);
        init();
    })
}
else if (response.task === 'Quit') {
    console.log (`${response.task} Goodbye!`);
//    init();
process.exit(0);
} 
});
};

pool.connect();
init();

// pool.query(`INSERT INTO department (id, name) VALUES (1,'Leena'), (2, 'Bob'), (3, 'Charlie');`)
// const sql = fs.readFileSync('./db/seeds.sql').toString();
// pool.query(sql, (err, res) => {
//     if (err) {
//         console.erros(err);
//     } else {
//         console.log('Seeds inserted successfully');
//     }
//     pool.end();
// });


// pool.query(`SELECT * FROM departments`, function (err, { rows }) { console.log(rows); })

pool.connect();

app.use((req, res) => {
    res.status(404).end();
});

// //connect to db
// sequelize.sync().then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})