const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Middlewares
app.use(morgan('dev'));

mongoose.connect('mongodb://admin:admin@node-rest-shard-00-00-wxb8i.mongodb.net:27017,node-rest-shard-00-01-wxb8i.mongodb.net:27017,node-rest-shard-00-02-wxb8i.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shard-0&authSource=admin')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET','PUT', 'POST', 'PATCH', 'DELETE')
        return res.status(200).json({});
    }
    next();
});


// Routes
const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);

const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);


// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;