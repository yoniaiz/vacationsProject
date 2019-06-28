var sql = require('../sqlObj');
const database = 'vacation_site_database';
const table = 'vacation';
const users_vacation_table = 'users_vacation';

var vicationsSql = sql.newSql(database,table);
var usersVacationSql = sql.newSql(database,users_vacation_table);

module.exports.getAll = async () => {
    let vications = await vicationsSql.selectPosts();
    await vications.forEach(vication =>{
        console.log(vication.start_date)
        start = String(vication.start_date)
        end = String(vication.end_date)
        vication.start_date = manipulateDate(start)
        vication.end_date = manipulateDate(end)
    })

    return vications;
}

module.exports.insertLikedVic = async (id,vicId) => {
    let userVic = {uId:id,vacationId:vicId}
    let exist = await usersVacationSql.getUser('uId', 'vacationId', id, vicId)
    if(exist.length == 0) {
        await usersVacationSql.insertUser(userVic)
        return true;
    }
    else {
        await usersVacationSql.delete('id', exist[0].id)
        return false
    }
     
}

module.exports.getAllLiked = async (id) => {
    let vications = await usersVacationSql.selectPostsWhere('uId',id);
    return vications;
}

module.exports.deleteVic = async (id) => {
    let vications = await vicationsSql.delete('id',id);
    return vications.protocol41;
}

module.exports.updateVic = async (vic) => {
    let keys = Object.keys(vic)
    let values = Object.values(vic)
    let vications;
    for (let index = 0; index < values.length; index++) {
        if(keys[index] === 'start_date')
            console.log("start date " +values[index])
        vications = await vicationsSql.update(vic.id,keys[index],values[index]);
        if(keys[index] === 'start_date')
            console.log("updated start date "+values[index])
    }
    return vications;
}

module.exports.addVic = async(vic) => {
    let vications = await vicationsSql.insertUser(vic)
    return vications;
}

manipulateDate = (str) =>{
    str.split(' ')
    newStr =[]
    for(i=0;i<16;i++)
        newStr[i]=str[i];
    str1 = newStr.join('')
    return str1;
}
