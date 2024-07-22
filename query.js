class Query {
    constructor(task){
        this.task = task;
    }
    query() {
        throw new Error ('Error');
    }
}

class UpdateEmployee extends Query {
    constructor (task){
        super(task);
    }
    query() {
        return pool.query(`UPDATE employee SET name = 'holis' WHERE id = 1;`)
    }
}

class ViewRoles extends Query {
    constructor (task) {
        super (task);
    }
    query() {
        console.log('Query funciono')
        return 'SELECT title FROM role';
    }
}
class AddRole extends Query {
    constructor(task) {
        super(task);
    }
    query() {
        // inquirer.prompt([{type: 'input', message: 'Add role title', name: 'role'}, {type:'input', message:'Add salary', name: 'salary'},{type: 'input', message:'Add Department', name:'department'}]);
        return `INSERT INTO role (title, salary, department) VALUES('${response.role}', ${response.salary}, ${response.department});`
    }
}

class ViewDepartments extends Query {
    constructor(task){
        super(task);
    }
    query() {
        return 'SELECT departments_id, departments_name FROM departments'
    }
}

class ViewEmployees extends Query {
    constructor (task) {
        super (task);
    }
    query() {
        return 'SELECT * FROM employee';
    }
}


class AddDepartment extends Query {
    constructor (task) {
        super (task);
    }
    query() {
        return `INSERT INTO department (name) VALUES ('Nuevo Depto');`
    }
}

module.exports = {UpdateEmployee, ViewRoles, AddRole, ViewDepartments, ViewEmployees, AddDepartment}