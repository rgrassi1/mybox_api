const Box = require('../models/Box');

const store = async(req, res) => {
    const box = await Box.create(req.body);   
    return res.json(box);
}

const show = async(req, res) => {
    try {
        const box = await Box.findById(req.params.id);
        const populate = { path: "files", options: { sort: { createdAt: -1 } } }
        const response = await Box.populate(box, populate);
        return res.json(response);    
    } catch(err) {
        return res.status(404).send(); 
    }
}

const showAll = async(req, res) => {
    const boxes = await Box.find().sort('-createdAt');
    return res.json(boxes);
}

module.exports = {
    store,
    show,
    showAll
}