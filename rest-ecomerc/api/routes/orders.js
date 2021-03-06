const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

const Order = require('../models/Order');

router.get('/', (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongooose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.get('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: 'Handling DELETE requests to /orders',
        orderId: req.params.orderId
    });
});

module.exports = router;