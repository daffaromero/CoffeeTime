const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({success: true, msg: 'Show current order'});
});

router.get('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Show order with ID ${req.params.id}`});
});

router.post('/', (req, res) => {
    res.status(200).json({success: true, msg: 'Create a new order'});
});

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Update order with ID ${req.params.id}`});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Delete order ${req.params.id}`})    
});

module.exports = router;