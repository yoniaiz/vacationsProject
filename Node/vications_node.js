const express = require('express');
const cors = require('cors');
const vicationsHandler = require('./Handlers/vicationsHandler')
const loginHandler = require('./Handlers/loginHandler')
var cookieParser = require('cookie-parser')
var session = require('express-session');
var bodyParser = require('body-parser');
const port = 8080;
var app = express();
var corsOptions = {
    optionsSuccessStatus: 200,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    credentials: true,
    origin: ['http://localhost:3000'], // here goes Frontend IP
}
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(session({
    secret: 'somerandonstuffs',
    resave: false,
}));


app.get('/getVacations', async (req, res) => {
    let vications = await vicationsHandler.getAll();
    res.send(vications);
})

app.get('/loginUser', async (req, res) => {
    let answer = await loginHandler.checkIfExist(req.query);
    let user = await loginHandler.getUser(req.query.first_name, req.query.password)
    user = JSON.stringify(user)
    if (req.query.rememberMe !='false') {
        res.cookie('remember-me', '1', {
            expires: new Date(Date.now() + 90000000),
            httpOnly: true
        })
        res.cookie('user', user, {
            expires: new Date(Date.now() + 90000000),
            httpOnly: true
        })
    }
    else{
        req.session.user = user;
    }
    res.send((answer.exist) ? (answer.role == 2) ? 'found-admin' : 'found' : 'User not found');
})
app.get('/insertUser', async (req, res) => {
    let answer = await loginHandler.insertUser(req.query.user);
    res.send((answer) ? 'inserted' : 'User exist');
})

app.get('/getUser', async (req, res) => {
    let user = await loginHandler.getUser(req.cookies['user'], req.cookies['password']);
    res.send(user)
})

app.get('/likedVic', async (req, res) => {
    let user = await loginHandler.getUser(req.query.first_name, req.query.password);
    let answer = await vicationsHandler.insertLikedVic(user[0].id,req.query.vicationId)
    res.send(answer)
})

app.get('/getLikedVacations', async (req, res) => {
    let user = await loginHandler.getUser(req.query.first_name, req.query.password);
    let vications = await vicationsHandler.getAllLiked(user[0].id);
    res.send(vications);
})

app.get('/rememberd', async (req, res) => {
    log = {
        remembrd : req.cookies['remember-me'],
        user : req.cookies['user'],
        session:req.session.user
    } 
    res.send(log)
})

app.get('/updateVic', async (req , res) => {
    let update = await vicationsHandler.updateVic(JSON.parse(req.query.vic));
    res.send(update)
})

app.get('/deleteVic', async (req , res) => {
    let deleted = await vicationsHandler.deleteVic(req.query.vic);
    res.send(deleted)
})

app.get('/addVic', async (req , res) => {
    let added = await vicationsHandler.addVic(JSON.parse(req.query.vic));
    res.send(added)
   
})

app.get('/clear', function (req, res) {
    res.clearCookie('remember-me', '1');
    res.clearCookie('user',req.query.user);
    req.session.destroy();
    res.send('removed')

})


app.get('/getVacationChart', async (req, res) => {
    let vacations = await vicationsHandler.getVacationChart();
    res.send(vacations)

})



app.listen(port);