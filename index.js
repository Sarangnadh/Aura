
const express = require('express')
const services = require('./services/data.service')
const jwt = require('jsonwebtoken')

const cors = require('cors')


// usig express creating server app
const auraTravel = express()


// parse Json data
auraTravel.use(express.json())

auraTravel.use(cors({
    origin: '*'
}))

// application middleware
const appMiddleware = (req, res, next) => {
    console.log("Application specific middleware");
    next()
}
// use middleware
auraTravel.use(appMiddleware)


const jwtMiddleware = (req, res, next) => {
    // fetchingtoken
    try {
        // token = req.body.token
        token = req.headers['user-access-token']
        // verify token
        const data = jwt.verify(token, services.USER_SECRET_KEY)
        console.log(data);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Please Log In"
        })
    }
}


// set up port number to the server app
auraTravel.listen(3001, () => {
    console.log("auraTravel");

})


// register
auraTravel.post('/register', (req, res) => {
    // console.log(req.body);
    services.register(req.body.fullname, req.body.email, req.body.mobno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })  
        
    // res.send('success')
})
// login
auraTravel.post('/login', (req, res) => {
    const result = services.login(req.body.email, req.body.password)
    res.status(result.statusCode).json(result)
    // console.log(result);

})
// booking
auraTravel.post('/booking', jwtMiddleware, (req, res) => {
    const result = services.bookingconfirm(req.body.customerName, req.body.email, req.body.mobno, req.body.password, req.body.tripInfo, req.body.preferences)
    res.status(result.statusCode).json(result)
    console.log("bookinglist", result);

})
