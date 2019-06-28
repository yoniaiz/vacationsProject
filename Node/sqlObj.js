var mysql = require('mysql');

module.exports.newSql = (database, table) => {
    return new sqlCommander(database, table)
}
class sqlCommander {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    createDatabase() {
        let con = createFirstConnection(this.database)
        let sql = `CREATE DATABASE IF NOT EXISTS ${this.database};`
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(this.database)
        })
    }
    createTable(name, sql) {
        let con = createConnection(this.database)
        let SQL = `CREATE TABLE IF NOT EXISTS ${name}(${sql})`
        con.query(SQL, (err, result) => {
            if (err) throw err;
        })
    }
    async insertUser(obj) {
        let con = createConnection(this.database)
        let sql = `INSERT INTO ${this.table} SET ?`
        return new Promise((resolve, reject) => {
            con.query(sql, obj, async (err, result) => {
                if (err) throw err;
                resolve(true)
            })
        })
    }
    async getUser(param, param2 ,name , password) {
        let con = createConnection(this.database)
        let sql = `SELECT * FROM ${this.table} WHERE ${param} = '${name}' AND ${param2} = '${password}'`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }
    async selectPostsWhere(param, id) {
        let con = createConnection(this.database)
        let sql = `SELECT * FROM ${this.table} WHERE ${param} = ${id}`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            })
        })
    }
    async selectSmallerPosts(param, id) {
        let con = createConnection(this.database)
        let sql = `SELECT * FROM ${this.table} WHERE ${param} < ${id}`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result, fields) => {
                if (err) throw err;
                resolve(result)
            })
        })
    }
    async selectPosts() {
        let con = createConnection(this.database)
        let sql = `SELECT * FROM ${this.table}`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }


    async delete(param, id) {
        let con = createConnection(this.database)
        let sql = `DELETE FROM ${this.table} WHERE ${param} = ${id}`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }
    async update(id, param , changeParam) {
        let con = createConnection(this.database)
        let sql = `UPDATE ${this.table} SET ${param} = '${changeParam}'  WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            con.query(sql,async (err, result) => {
                if (err) throw err;
                resolve(param + " changed to " + changeParam);
            })
        })
    }
    async joinTabels(secondTable) {
        let con = createConnection(this.database)
        let sql = `SELECT users_vacation.vacationId, 
                   vacation.location
                   FROM users_vacation 
                   JOIN vacation 
                   ON 
                   users_vacation.vacationId = vacation.id
                                                            `
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }

    async howMany(param){
        let con = createConnection(this.database)
        let sql = `SELECT SUM(IF(vacationId=${param},1,0)) FROM ${this.table}`
        return new Promise((resolve, reject) => {
            con.query(sql, async (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }
}
createFirstConnection = (database) => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    })
    con.connect((err) => {
        if (err) throw err
        console.log("My sql connected to ", database)
    })
    return con;
}
createConnection = (database) => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: database
    })
    con.connect((err) => {
        if (err) throw err
        console.log("My sql connected to ", database)
    })
    return con;
}