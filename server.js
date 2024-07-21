const inquirer = require('inquirer');
const fs = require('fs');

function runQuery (

)

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
else if (response.task === 'View All Roles'){
    console.log (`${response.task} funciono`)
}
else if (response.task === 'Add Role') {
    console.log (`${response.task} funciono`)
}
else if (response.task === 'View All Departments') {
    console.log (`${response.task} funciono`)
  query = " SELECT * departments_id, departments_name FROM departments"
    fs.writeFileSync('./db/query.sql',query, err => err ? console.error('failed to write file') : console.log('success'))

}
else if (response.task === 'Add Department') {
    console.log (`${response.task} funciono`)
}
else if (response.task === 'Quit') {
    console.log (`${response.task} funciono`)
} 
else if (response.task === 'View All Employees') {
    console.log (`${response.task} funciono`)
}
});