const express = require('express')
const app = express()
const cors = require('cors');
const config = require('./config');
const port = config.host_port;
const {upload} = require('./services/s3');

const busRoute = require('./api/bus_routes/routes');
const buses = require('./api/buses/routes');
const stopRoute = require('./api/stops/routes');
const userRoute = require('./api/users/routes');
const auth_route = require('./api/auth/routes');
const notification = require('./api/notification/routes');
const depts = require('./api/depts/routes');
const request = require('./api/request/routes');


//middleWares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(config.corsOptions));
app.use(upload.single('image'));

//Routes
app.use('/auth',auth_route);
app.use('/busRoutes',busRoute);
app.use('/buses',buses);
app.use('/stops',stopRoute);
app.use('/users',userRoute);
app.use('/notification',notification);
app.use('/depts',depts);
app.use('/request',request);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

process.on('uncaughtException', function (err) {
    try {
        console.log(err);
    } catch (err) {

    }
});

app.listen(port,config.host,() => {
  console.log(`Example app listening on port ${port}`)
})