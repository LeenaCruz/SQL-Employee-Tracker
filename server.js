const inquirer = require('inquirer');
const fs = require('fs');
const { Pool } = require('pg');
const { UpdateEmployee, ViewRoles, AddRole, ViewDepartments, ViewEmployees, AddDepartment } = require('./query.js')
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

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'task',
                choices: ['Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Add Employee', 'View All Employees', 'Quit'],

            },
        ])
        .then((response) => {
            console.log("Enhorabuena")

            let query;
            if (response.task === 'Update Employee Role') {
                console.log(`${response.task} funciono`)
                //update employee role in db
                //que tendria que hacer? mostrar db? escoger empleado? actualizar datos en db?
            }
            else if (response.task === 'View All Roles') {
                pool.query("SELECT * FROM role")
                    .then(({ rows }) => {
                        console.table(rows);
                        init();
                    })
            }
            else if (response.task === 'Add Role') {
                inquirer.prompt([{type: 'input', message: 'Add role title', name: 'role'}, {type:'input', message:'Add salary', name: 'salary'},{type: 'input', message:'Add Department Number', name:'department'}])
                .then(({role, salary, department}) => {
                    pool.query(`INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`, [role, salary, department])
                    .then(()=> {
                        console.log(`Role was successfully added!`);
                        init();
                    }) 
                })
            }
            else if (response.task === 'View All Departments') {
                pool.query("SELECT department.id, department.name FROM department")
                    .then(({ rows }) => {
                        console.table(rows);
                        init();
                    })
            }
            else if (response.task === 'Add Department') {
                inquirer.prompt([
                    {
                        message: "What is the name of the department?",
                        name: "departmentName"
                    }
                ])
                    .then(({ departmentName }) => {
                        pool.query(`INSERT INTO department (name) VALUES ($1)`, [departmentName])
                        .then(()=> {
                            console.log(`${departmentName} was successfully added!`);
                            init();
                        })
                    })
            }
            else if (response.task === 'Add Employee')
                inquirer.prompt([{type: 'input', message: 'What is the employee first name?', name: 'firstName'}, {type: 'input', message: 'What is the employee last name?', name: 'lastName'}, {type:'input', message:'What is they role?', name: 'role'},{type: 'input', message:'Who is their manager?', name:'manager'}])
            .then(({firstName, lastName, role, manager}) => {
                pool.query(`INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES ($1, $2, $3, $4)`, [firstName, lastName, role, manager])
                .then(()=> {
                    console.log(`New Employee successfully added!`);
                    init();
                }) 
            })



            else if (response.task === 'View All Employees') {
                pool.query("SELECT employee.id, employee.first_name, employee.last_name, role.department, role.salary FROM employee JOIN role ON employee.id = role.id")
                    .then(({ rows }) => {
                        console.table(rows);
                        init();
                    })
            }
            else if (response.task === 'Quit') {
                console.log(`Goodbye!`);
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