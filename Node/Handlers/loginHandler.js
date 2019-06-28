var sql = require('../sqlObj');
const database = 'vacation_site_database';
const table = 'users';

var usersSql = sql.newSql(database, table);

module.exports.checkIfExist = async (user) => {
    return await findUser(user);
}

module.exports.insertUser = async (user) => {
    let inderted = false;
    let exist = await findUser(JSON.parse(user))
    if (!exist.exist)
        inderted = await usersSql.insertUser(JSON.parse(user));
    return (inderted);
}

module.exports.getUser = async (name,password) => {
    let user = await usersSql.getUser('first_name', 'password', name, password)
    return user
}
findUser = async (user) => {
    let checkUser = await usersSql.getUser('first_name', 'password', user.first_name, user.password)
    if (checkUser.length == 0) return ({exist:false,role:0})
    else return ({exist:true,role:checkUser[0].role})
}

