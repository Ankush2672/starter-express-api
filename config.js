require('dotenv').config();
const { glob, globSync } = require('glob');
const path = require('path');
const mongoose = require('mongoose');

(async function init() {
    await mongoose.connect(`mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster1.yue1n09.mongodb.net/${process.env.dbName}`);
    console.log("connected to db");
})();
//gfghfgffgjhfjhfhj
const config = {
    corsOptions: {
        credentials: true,
        origin: "*",
    },
    modals: (() => {
        let list = {};
        glob
            .sync('api/**/modal.js', {
                root: __dirname,
            })
            .forEach((file) => {
                const { name, modal } = require(`./${file}`);
                list[name] = modal;
            });
        return list;
    })(),
    host: () => {
        if (process.env.NODE_ENV === 'production') {
            return process.env.PRODUCTION_HOST;
        } else if (process.env.NODE_ENV === 'staging') {
            return process.env.STAGING_HOST;
        } else if (process.env.NODE_ENV === 'development') {
            return process.env.DEVELOPMENT_HOST;
        } else { return '0.0.0.0'; }
    },
    host_port: (() => {
        return process.env.PORT || 3000;
    })(),
    roles: {
        superAdmin: 1,
        transportIncharge: 2,
        busIncharge: 3,
        driver: 4,
        student: 5
    },
    emailSubject: {
        transport_account_created : " Transport Account created Successfully"
    }
}

module.exports = config;